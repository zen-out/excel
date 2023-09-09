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
    hk.push(duplicate);
    // hk.splice(index + 1, 0, duplicate);
  }
  return hk;
}
// 70840

function getBeforeQty(hk, currHK, bdActualBeforeQty) {
  // bdActualBeforeQty += WEIGHT_TO_ADD;
  let returnQty;
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
        returnQty = seeIfWhole;
      } else {
        let rounded = Math.ceil(seeIfWhole);
        returnQty = rounded * hkKg;
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
  return returnQty;
}

function getAfterQtyPartOne(hk, currHK, bdActualAfterQty) {
  let returnQty;
  if (!currHK) {
    console.log("ERROR");
    return;
  }
  let currHKQty = currHK.qty;
  let hkKg = currHK.kg;
  let materialNo = currHK.materialNo;
  let filteredHK = _.filter(hk, {
    materialNo: materialNo,
    added: true,
  });
  // console.log(filteredHK);
  if (filteredHK.length) {
    let totalBefore = _.sumBy(filteredHK, "qty");
    // console.log(bdActualAfterQty);
    let checkNegative = currHKQty - totalBefore;
    if (checkNegative > 0) {
      returnQty = currHKQty - totalBefore;
    } else {
      returnQty = currHKQty;
    }

    // console purposes
    if (materialNo.includes("70840")) {
      // console.log(totalBefore, " should be 13.5");
      // console.log(returnQty, " should be 18.4");
    }
  } else {
    returnQty = currHKQty;
  }
  return returnQty;

  // if (filteredBD.length) {
  //   let totalBD = _.sumBy(filteredBD, "owedQty");
  //   returnQty = currQty - totalBefores;
  // } else {
  //   // returnQty =
  // }
}

function getAfterQtyPartTwo(og_hk, edited_hk, test) {
  // console.log(og_hk);
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
