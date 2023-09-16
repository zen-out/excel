const _ = require("lodash");
const {
  markHKAdded,
  markBDAdded,
  neverMoreThanHKQty,
} = require("./utility.js");
function getAfterActualQuantity(bd, bd_filter) {
  let actualQuantity = 0;
  let seaShipFlag = false;
  for (let j = 0; j < bd_filter.length; j++) {
    let currBD = bd_filter[j];
    if (!currBD.added) {
      if (!currBD.before) {
        // If it has an assign max in transit date, and its date is creater than date of issue, and it's allocate in transit date is not zero
        if (currBD.owedQty != 0) {
          actualQuantity += currBD.owedQty;
          seaShipFlag = true;
          markBDAdded(bd, currBD);
        }
      }
    }
  }

  return { seaShipFlag, actualQuantity };
}

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
function markAfters(hk, bd, test) {
  for (let i = 0; i < hk.length; i++) {
    let materialNo = hk[i].materialNo;
    if (!hk[i].added) {
      let bd_filter = _.filter(bd, { materialNo: materialNo });
      let { seaShipFlag, actualQuantity } = getAfterActualQuantity(
        bd,
        bd_filter
      );

      hk[i].airOrShip = "SC";
      if (hk[i].qty < hk[i].kg) {
        hk[i].qty = hk[i].kg;
      }
      markHKAdded(hk, hk[i]);
    }
  }

  return { hk, bd };
}

module.exports = { getAfterActualQuantity, getAfterQty, markAfters };
