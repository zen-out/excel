const _ = require("lodash");
const { WEIGHT_TO_ADD } = require("./variables.js");

function markBDAdded(array, arrayOrObject) {
  if (Array.isArray(arrayOrObject)) {
    for (let i = 0; i < arrayOrObject.length; i++) {
      let foundIdx = _.findIndex(array, function (item) {
        return item == arrayOrObject[i];
      });
      array[foundIdx].added = true;
    }
    return array;
  } else if (typeof arrayOrObject == "string") {
    // console.log(array, "hey");
    // for (let i = 0; i < array.length; i++) {
    //   if (array[i].materialNo == arrayOrObject) {
    //     array[i].added = true;
    //   }
    // }
  } else {
    let foundIdx = _.findIndex(array, function (item) {
      return item == arrayOrObject;
    });
    array[foundIdx].added = true;
    return array;
  }
}
function markHKAdded(array, arrayOrObject, addAC, quantity) {
  if (Array.isArray(arrayOrObject)) {
    for (let i = 0; i < arrayOrObject.length; i++) {
      let foundIdx = _.findIndex(array, function (item) {
        return item == arrayOrObject[i];
      });
      if (foundIdx > -1) {
        array[foundIdx].added = true;
      }
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
    if (quantity) {
      array[foundIdx].qty = quantity;
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
    let scQty = hkObject.qty - calculatedBefore;
    hkObject.remarks = `拆${acSheets}条空运其余船运`;
    hk = duplicateItemWithSC(hk, hkObject, scQty);
  }
  return { hk, bd };
}
function getBeforeQty(hk, currHK, bd, bdActualBeforeQty) {
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

    let getDuplicates = shouldDuplicate(
      hk,
      currHK,
      bd,
      calculatedBeforeQty,
      acSheets
    );
    hk = getDuplicates.hk;
    bd = getDuplicates.bd;
    hk = markHKAdded(hk, currHK, true, calculatedBeforeQty);
  }
  if (!acSheets) {
    acSheets = null;
  }
  return hk;
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

function getAfterQtyPartTwo(og_hk, edited_hk, test) {
  let og = _.filter(og_hk, { materialNo: test });
  let hk = _.filter(edited_hk, { materialNo: test });
  let get_first = og[0].qty;
  let get_first_hk = hk[0].qty;
  let subtract = get_first - get_first_hk;
  return subtract.toFixed(2);
}

module.exports = {
  getAfterQty,
  getAfterQtyPartTwo,
  markHKAdded,
  // getBeforeCalculatedQuantity,
  markBDAdded,
  getBeforeQty,
  duplicateItemWithSC,
};
