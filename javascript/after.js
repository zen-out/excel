const _ = require("lodash");
const {
  markHKAdded,
  markBDAdded,
  neverMoreThanHKQty,
  getFiltered,
} = require("./utility.js");
const { isSecondDateLater } = require("./dates.js");
function getAfterQty(hk, currHK) {
  let returnQty;
  let currHKQty = currHK.qty;
  let hkKg = currHK.kg;
  let materialNo = currHK.materialNo;
  let filteredHK = _.filter(hk, {
    materialNo: materialNo,
    added: true,
  });
  if (filteredHK.length) {
    let totalBefore = _.sumBy(filteredHK, "qty");
    let checkNegative = currHKQty - totalBefore;
    if (checkNegative > 0) {
      returnQty = currHKQty - totalBefore;
    } else {
      returnQty = currHKQty;
    }
  } else {
    returnQty = currHKQty;
  }
  return returnQty;
}
function getBDAfterActualQuantity(bd, bd_filter) {
  let actualQuantity = 0;
  let seaShipFlag = false;
  for (let j = 0; j < bd_filter.length; j++) {
    let currBD = bd_filter[j];
    if (!currBD.added) {
      if (!currBD.before) {
        let assignMaxIsLater = isSecondDateLater(
          currBD.dateOfIssue,
          currBD.assignMaxInTransit
        );
        if (assignMaxIsLater) {
          seaShipFlag = true;
          actualQuantity = actualQuantity + currBD.owedQty;
          bd = markBDAdded(bd, currBD);
        } else {
          actualQuantity += currBD.materialShortageAfterInventory;
          seaShipFlag = true;
          bd = markBDAdded(bd, currBD);
        }
      }
    }
  }
  if (actualQuantity > 0) {
    actualQuantity = actualQuantity.toFixed(3);
    actualQuantity = parseFloat(actualQuantity);
  }
  if (actualQuantity == 0) {
    seaShipFlag = false;
  }
  return { seaShipFlag, actualQuantity };
}
function sumOfCurrentHK(hk, materialNo) {
  let filtered = _.filter(hk, { materialNo: materialNo });
  let sum = _.sumBy(filtered, "qty");
  return sum;
}
function sumOfCurrentBeforeHK(hk, materialNo) {
  let filtered = _.filter(hk, { materialNo: materialNo, airOrShip: "AC" });
  let sum = _.sumBy(filtered, "qty");
  return sum;
}
function duplicateAfter(hk, obj, number) {
  let index = _.findIndex(hk, obj);
  if (index !== -1) {
    let duplicate = JSON.parse(JSON.stringify(hk[index]));
    duplicate.airOrShip = "SC";
    if (typeof number == "number") {
      duplicate.added = true;
      number = parseFloat(number.toFixed(2));
      duplicate.qty = number;
    }
    hk.push(duplicate);
  }
  return hk;
}
function markAfters(hk, bd, test) {
  for (let i = 0; i < hk.length; i++) {
    let materialNo = hk[i].materialNo;
    let originalQty = hk[i].qty;
    if (!hk[i].added) {
      let bd_filter = _.filter(bd, { materialNo: materialNo });
      let { seaShipFlag, actualQuantity } = getBDAfterActualQuantity(
        bd,
        bd_filter
      );
      let hkSum = sumOfCurrentHK(hk, materialNo);
      hk[i].airOrShip = "SC";
      if (hkSum > actualQuantity) {
      } else if (hk[i].qty < actualQuantity) {
      } else if (hk[i].qty < hk[i].kg) {
        hk[i].qty = hk[i].kg;
      }
      hk = markHKAdded(hk, hk[i]);
    }
  }

  return { hk, bd };
}

module.exports = { getBDAfterActualQuantity, getAfterQty, markAfters };
