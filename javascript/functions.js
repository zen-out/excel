const _ = require("lodash");
const { WEIGHT_TO_ADD } = require("../variables.js");

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

function getBeforeQty(hk, currHK, bdActualBeforeQty) {
  bdActualBeforeQty += WEIGHT_TO_ADD;
  let returnQty;
  let currHKQty = currHK.qty;
  let materialNo = currHK.materialNo;
  let hkKg = currHK.kg;

  let filteredHK = _.filter(hk, {
    materialNo: currHK.materialNo,
    added: false,
  });
  if (materialNo.includes("81200")) {
    console.log("whats up here?", filteredHK);
  }
  if (materialNo.includes("81200")) {
    console.log("does it have any afters? should be yes");
    console.log("MATERIAL", filteredHK.length);
  }
  if (filteredHK.length > 1) {
    let sortedArr = _.sortBy(filteredHK, "qty");
    let result = _.find(sortedArr, function (item) {
      return item.qty > bdActualBeforeQty;
    });
    if (materialNo.includes("81200")) {
      console.log("find the one that's greatest");
      console.log("MATERIAL", result);
    }
    if (result) {
      currHKQty = result.qty;
      hkKg = result.kg;
      let seeIfWhole = bdActualBeforeQty / hkKg;
      if (Number.isInteger(seeIfWhole)) {
        returnQty = seeIfWhole;
      } else {
        let rounded = Math.ceil(seeIfWhole);
        returnQty = rounded * hkKg;
      }
      if (materialNo.includes("81200")) {
        console.log("do calculation");
        console.log("MATERIAL", returnQty);
      }
      markAsAdded(hk, result);
    } else {
      // lol
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

  if (materialNo.includes("81200")) {
    console.log("MATERIAL", returnQty);
  }
  return returnQty;
}

function getAfterQty(hk, currHK, bdActualAfterQty) {
  let returnQty;
  // console.log("curr", currHK);
  let currHKQty = currHK.qty;
  let hkKg = currHK.kg;
  let filteredHK = _.filter(hk, {
    materialNo: currHK.materialNo,
    added: true,
  });
  // console.log(filteredHK);
  if (filteredHK.length) {
    let totalBefore = _.sumBy(filteredHK, "qty");
    // console.log(totalBefore, "totalBefore");
    returnQty = bdActualAfterQty - totalBefore;
  }
  return returnQty;

  // if (filteredBD.length) {
  //   let totalBD = _.sumBy(filteredBD, "owedQty");
  //   returnQty = currQty - totalBefores;
  // } else {
  //   // returnQty =
  // }
}

module.exports = {
  getAfterQty,
  markAsAdded,
  getBeforeQty,
  duplicateItemWithSC,
};
