const _ = require("lodash");
const {
  markHKAdded,
  markBDAdded,
  neverMoreThanHKQty,
  getFiltered,
  markHKBeforeAC,
} = require("./utility.js");
const { isSecondDateLater } = require("./dates.js");
function duplicateBefore(hk, obj, number) {
  let index = _.findIndex(hk, obj);
  if (index !== -1) {
    let duplicate = JSON.parse(JSON.stringify(hk[index]));
    duplicate.airOrShip = "SC";

    if (typeof number == "number") {
      duplicate.added = true;
      number = parseFloat(number.toFixed(2));
      duplicate.qty = number;
    } else {
      duplicate.added = false;
    }

    hk.push(duplicate);
  }
  return hk;
}

function shouldDuplicate(hk, hkObject, bd, calculatedBefore, acSheets) {
  if (hkObject.qty > calculatedBefore) {
    let otherBDs = _.filter(bd, function (item) {
      return (
        item.before === false &&
        item.owedQty > 0 &&
        item.materialNo == hkObject.materialNo
      );
    });
    let otherHKs = _.filter(hk, function (item) {
      return (
        item.materialNo === hkObject.materialNo && !_.isEqual(item, hkObject)
      );
    });
    // hk = markHKAdded(hk, otherHKs);
    bd = markBDAdded(bd, otherBDs);
    let lessThanOneSheet = hkObject.qty - calculatedBefore;
    if (lessThanOneSheet < hkObject.kg) {
      hk = markHKAdded(hk, hkObject, false);
    } else {
      hkObject.remarks = `拆${acSheets}条空运其余船运`;
      hk = duplicateBefore(hk, hkObject, lessThanOneSheet);
    }
  }

  return { hk, bd };
}

function getBeforeActualQuantity(bd, bd_filter, test) {
  let actualQuantity = 0;
  let airShipFlag = false;
  for (let j = 0; j < bd_filter.length; j++) {
    let currBD = bd_filter[j];
    let materialNo = currBD.materialNo;
    if (!currBD.added) {
      if (currBD.before) {
        let assignMaxIsLater = isSecondDateLater(
          currBD.dateOfIssue,
          currBD.assignMaxInTransit
        );
        if (assignMaxIsLater) {
          airShipFlag = true;
          actualQuantity = actualQuantity + currBD.owedQty;
          bd = markBDAdded(bd, currBD);
        } else {
          actualQuantity += currBD.materialShortageAfterInventory;
          airShipFlag = true;
          bd = markBDAdded(bd, currBD);
        }
      }
    }
  }
  if (actualQuantity > 0) {
    actualQuantity = actualQuantity.toFixed(3);
    actualQuantity = parseFloat(actualQuantity);
  }
  if (actualQuantity <= 0) {
    airShipFlag = false;
  }
  let markedBDs = bd;
  return { markedBDs, airShipFlag, actualQuantity };
}

function round(currHK, bdActualBeforeQty) {
  let currHKQty = currHK.qty;
  let hkKg = currHK.kg;
  let seeIfWhole = bdActualBeforeQty / hkKg;
  let acSheets;
  let calculatedBeforeQty;
  if (Number.isInteger(seeIfWhole)) {
    acSheets = seeIfWhole;
    calculatedBeforeQty = neverMoreThanHKQty(seeIfWhole, hkKg, currHKQty);
  } else {
    let rounded = Math.ceil(seeIfWhole);
    acSheets = rounded;
    calculatedBeforeQty = neverMoreThanHKQty(rounded, hkKg, currHKQty);
  }
  return { calculatedBeforeQty, acSheets };
}

function getBeforeQty(hk, currHK, bd, bdActualBeforeQty, test) {
  // bdActualBeforeQty += WEIGHT_TO_ADD;
  let calculatedBeforeQty;
  let acSheets;
  let currHKQty = currHK.qty;
  let materialNo = currHK.materialNo;
  let filteredHK = _.filter(hk, {
    materialNo: currHK.materialNo,
    added: false,
  });

  if (filteredHK.length > 1) {
    let filteredBDBefore = _.filter(bd, {
      materialNo: materialNo,
      before: true,
    });

    const bdBeforeSum = _.reduce(
      filteredBDBefore,
      (total, obj) => {
        return total + _.get(obj, "owedQty", 0);
      },
      0
    );
    let filteredBDAfter = _.filter(bd, {
      materialNo: materialNo,
      before: false,
    });
    let sortedArr = _.sortBy(filteredHK, "qty");
    let result = _.find(sortedArr, function (item) {
      return item.qty > bdActualBeforeQty;
    });
    if (result) {
      let getOutput = round(result, bdActualBeforeQty);
      calculatedBeforeQty = getOutput.calculatedBeforeQty;
      acSheets = getOutput.acSheets;
      let getDuplicates = shouldDuplicate(
        hk,
        result,
        bd,
        calculatedBeforeQty,
        acSheets
      );
      hk = getDuplicates.hk;
      bd = getDuplicates.bd;
      hk = markHKAdded(hk, result, true, getOutput.calculatedBeforeQty);
    } else {
      if (filteredBDBefore.length) {
        hk = markHKAdded(hk, currHK, true);
      }
      if (bdBeforeSum > currHKQty) {
        hk = markHKBeforeAC(hk, currHK);
      }
      console.log(hk);
    }
  } else {
    if (currHKQty > bdActualBeforeQty) {
      if (bdActualBeforeQty == 0) {
      } else {
        let getOutput = round(currHK, bdActualBeforeQty);
        calculatedBeforeQty = getOutput.calculatedBeforeQty;
        acSheets = getOutput.acSheets;
      }
    } else {
      calculatedBeforeQty = currHK.qty;
    }
    let getDuplicates = shouldDuplicate(
      hk,
      currHK,
      bd,
      calculatedBeforeQty,
      acSheets
    );
    hk = getDuplicates.hk;
    bd = getDuplicates.bd;
    // console.log(hk, "hk");
    let lessThanOneSheet = currHK.qty - calculatedBeforeQty;
    if (lessThanOneSheet < currHK.kg) {
      hk = markHKAdded(hk, currHK, true);
    } else {
      hk = markHKAdded(hk, currHK, true, calculatedBeforeQty);
    }
  }
  if (!acSheets) {
    acSheets = null;
  }
  return hk;
}

function markBefores(hk, bd, test) {
  hk = _.orderBy(hk, ["airOrShip", "materialNo"], ["desc", "desc"]);
  bd = _.orderBy(bd, ["owedQty"], ["desc"]);
  for (let i = 0; i < hk.length; i++) {
    let materialNo = hk[i].materialNo;
    if (!hk[i].added) {
      let bd_filter = _.filter(bd, { materialNo: materialNo });
      let { markedBDs, airShipFlag, actualQuantity } = getBeforeActualQuantity(
        bd,
        bd_filter,
        test
      );
      bd = markedBDs;
      if (airShipFlag) {
        hk = getBeforeQty(hk, hk[i], bd, actualQuantity, test);
      }
    }
  }
  return { hk, bd };
}

module.exports = {
  duplicateBefore,
  shouldDuplicate,
  getBeforeActualQuantity,
  getBeforeQty,
  markBefores,
};
