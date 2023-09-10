const _ = require("lodash");
const { WEIGHT_TO_ADD } = require("./variables.js");

function markAsAdded(array, arrayOrObject, addAC) {
  if (Array.isArray(arrayOrObject)) {
    for (let i = 0; i < arrayOrObject.length; i++) {
      let foundIdx = _.findIndex(array, function (item) {
        return item == arrayOrObject[i];
      });
      array[foundIdx].added = true;
    }
    return array;
  } else {
    let foundIdx = _.findIndex(array, function (item) {
      return item == arrayOrObject;
    });
    array[foundIdx].added = true;
    if (addAC) {
      array[foundIdx].airOrShip = "AC";
    }
    return array;
  }
}
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
    } else {
      duplicate.added = false;
    }
    hk.push(duplicate);
    // hk.splice(index + 1, 0, duplicate);
  }
  return hk;
}

function neverMoreThanHKQty(number, hkKg, currHKQty) {
  let lessThanHKQty = number * hkKg;
  if (lessThanHKQty > currHKQty) {
    return currHKQty;
  } else {
    return lessThanHKQty;
  }
}
// 70840
function getBeforeQty(hk, currHK, bdActualBeforeQty) {
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
      markAsAdded(hk, result, true);
    } else {
      // lol
    }
  } else {
    if (currHKQty > bdActualBeforeQty) {
      let seeIfWhole = bdActualBeforeQty / hkKg;
      if (Number.isInteger(seeIfWhole)) {
        calculatedBeforeQty = neverMoreThanHKQty(seeIfWhole, hkKg, currHKQty);
        acSheets = seeIfWhole;
      } else {
        let rounded = Math.ceil(seeIfWhole);
        acSheets = rounded;
        calculatedBeforeQty = neverMoreThanHKQty(rounded, hkKg, currHKQty);
      }
    } else {
      calculatedBeforeQty = currHKQty;
    }
    markAsAdded(hk, currHK);
  }
  if (!acSheets) {
    acSheets = null;
  }
  return { calculatedBeforeQty, acSheets };
}
function getAfterQtyPartOne(hk, currHK, bdActualAfterQty) {
  let returnQty;
  if (!currHK) {
    console.debug("ERROR", currHK, bdActualAfterQty, "ERROR");
    return;
  }
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

function getAfterQtyPartTwo(og_hk, edited_hk, test) {
  let og = _.filter(og_hk, { materialNo: test });
  let hk = _.filter(edited_hk, { materialNo: test });
  let get_first = og[0].qty;
  let get_first_hk = hk[0].qty;
  let subtract = get_first - get_first_hk;
  return subtract.toFixed(2);
}

module.exports = {
  getAfterQtyPartOne,
  getAfterQtyPartTwo,
  markAsAdded,
  getBeforeQty,
  duplicateItemWithSC,
};
