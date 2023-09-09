const _ = require("lodash");

function markAsAdded(bd, object) {
  let foundIdx = _.findIndex(bd, function (item) {
    return item == object;
  });
  bd[foundIdx].added = true;
  return bd;
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

function getBeforeQty(currHKQty, hkKg, bdActualBeforeQty) {
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
  duplicateItemWithSC,
};
