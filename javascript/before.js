const _ = require("lodash");
const {
  markHKAdded,
  markBDAdded,
  neverMoreThanHKQty,
  getFiltered,
} = require("./utility.js");
const { isSecondDateLater } = require("./dates.js");
function duplicateItemWithSC(hk, obj, number) {
  let index = _.findIndex(hk, obj);
  if (index !== -1) {
    // Create a deep copy of the object to avoid reference issues
    let duplicate = JSON.parse(JSON.stringify(hk[index]));
    // Insert the duplicate object right after the original
    duplicate.airOrShip = "SC";
    if (typeof number == "number") {
      duplicate.added = true;
      number = parseFloat(number.toFixed(2));
      duplicate.qty = number;
      if (obj.materialNo.includes("70840")) {
        // console.log("hi", duplicate);
      }
    } else {
      duplicate.added = false;
    }
    hk.push(duplicate);
    // hk.splice(index + 1, 0, duplicate);
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
    hk = markHKAdded(hk, otherHKs);
    bd = markBDAdded(bd, otherBDs);
    let lessThanOneSheet = hkObject.qty - calculatedBefore;
    if (lessThanOneSheet < hkObject.kg) {
      hk = markHKAdded(hk, hkObject, false);
    } else {
      hkObject.remarks = `拆${acSheets}条空运其余船运`;
      hk = duplicateItemWithSC(hk, hkObject, lessThanOneSheet);
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
  if (actualQuantity == 0) {
    airShipFlag = false;
  }
  let markedBDs = bd;
  return { markedBDs, airShipFlag, actualQuantity };
}

function getBeforeQty(hk, currHK, bd, bdActualBeforeQty, test) {
  // bdActualBeforeQty += WEIGHT_TO_ADD;
  let calculatedBeforeQty;
  let acSheets;
  let currHKQty = currHK.qty;
  let materialNo = currHK.materialNo;
  let hkKg = currHK.kg;
  let filteredHK = _.filter(hk, {
    materialNo: currHK.materialNo,
    added: false,
  });
  if (filteredHK.length > 1) {
    let sortedArr = _.sortBy(filteredHK, "qty");
    let result = _.find(sortedArr, function (item) {
      return item.qty > bdActualBeforeQty;
    });

    if (result) {
      currHKQty = result.qty;
      hkKg = result.kg;
      let seeIfWhole = bdActualBeforeQty / hkKg;
      if (Number.isInteger(seeIfWhole)) {
        acSheets = seeIfWhole;
        calculatedBeforeQty = neverMoreThanHKQty(seeIfWhole, hkKg, currHKQty);
      } else {
        let rounded = Math.ceil(seeIfWhole);
        acSheets = rounded;
        calculatedBeforeQty = neverMoreThanHKQty(rounded, hkKg, currHKQty);
      }
      hk = markHKAdded(hk, result, true, calculatedBeforeQty);
    } else {
      // lol
    }
  } else {
    if (currHKQty > bdActualBeforeQty) {
      if (bdActualBeforeQty == 0) {
      } else {
        let seeIfWhole = bdActualBeforeQty / hkKg;
        if (Number.isInteger(seeIfWhole)) {
          calculatedBeforeQty = neverMoreThanHKQty(seeIfWhole, hkKg, currHKQty);
          acSheets = seeIfWhole;
        } else {
          let rounded = Math.ceil(seeIfWhole);
          acSheets = rounded;
          calculatedBeforeQty = neverMoreThanHKQty(rounded, hkKg, currHKQty);
        }
      }
    } else {
      calculatedBeforeQty = currHKQty;
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
      if (test == materialNo) {
        // console.log(materialNo, actualQuantity, airShipFlag);
      }
      if (airShipFlag) {
        hk = getBeforeQty(hk, hk[i], bd, actualQuantity, test);
      }
    }
  }
  hk = _.orderBy(hk, ["airOrShip", "materialNo"], ["asc", "asc"]);
  bd = _.orderBy(bd, ["owedQty"], ["desc"]);
  return { hk, bd };
}

module.exports = {
  duplicateItemWithSC,
  shouldDuplicate,
  getBeforeActualQuantity,
  getBeforeQty,
  markBefores,
};
