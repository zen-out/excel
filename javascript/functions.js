const _ = require("lodash");

function markAsAdded(array, object) {
  let foundIdx = _.findIndex(array, function (item) {
    return item == object;
  });
  array[foundIdx].added = true;
  return array;
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
      duplicate.qty = number;
    } else {
      duplicate.added = false;
    }
    hk.splice(index + 1, 0, duplicate);
  }
  return hk;
}
// 70840

function getBeforeQty2(hk, currHK, bdActualBeforeQty) {
  let returnQty;
  let currHKQty = currHK.qty;
  let hkKg = currHK.kg;
  let filteredHK = _.filter(hk, { materialNo: currHK.materialNo });
  // console.log(filteredHK.length, "length");
  if (filteredHK.length > 1) {
    let sortedArr = _.sortBy(filteredHK, "qty");
    let result = _.find(sortedArr, function (item) {
      return item.qty > bdActualBeforeQty;
    });
    if (result) {
    } else {
    }
  } else {
    if (currHKQty > bdActualBeforeQty) {
      let seeIfWhole = bdActualBeforeQty / hkKg;
      if (Number.isInteger(seeIfWhole)) {
        returnQty = seeIfWhole;
      } else {
        let rounded = Math.ceil(seeIfWhole);
        returnQty = rounded * hkKg;
      }
    } else {
      returnQty = currHKQty;
    }
    markAsAdded(hk, currHK);
  }
  return returnQty;
}

function getBeforeQty(hk, currHKQty, hkKg, bdActualBeforeQty) {
  let returnQty;
  if (currHKQty > bdActualBeforeQty) {
    let seeIfWhole = bdActualBeforeQty / hkKg;
    if (Number.isInteger(seeIfWhole)) {
      returnQty = seeIfWhole;
    } else {
      let rounded = Math.ceil(seeIfWhole);
      returnQty = rounded * hkKg;
    }
  } else {
    returnQty = currHKQty;
  }
  return returnQty;
}

function getAfterQty(filteredHK, filteredBD, currQty, actualQty) {
  let returnQty;
  let totalBefores = 0;
  let totalHK = _.sumBy(filteredHK, "qty");

  if (filteredBD.length) {
    let totalBD = _.sumBy(filteredBD, "owedQty");
    returnQty = currQty - totalBefores;
  } else {
    // returnQty =
  }
  console.log(returnQty);
}

module.exports = {
  getBeforeQty,
  getAfterQty,
  markAsAdded,
  getBeforeQty2,
  duplicateItemWithSC,
};
