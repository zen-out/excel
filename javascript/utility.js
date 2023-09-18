const _ = require("lodash");

function getFiltered(arr, materialNo) {
  return _.filter(arr, (o) => _.includes(o.materialNo, materialNo));
}
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
    /*
    for (let i = 0; i < array.length; i++) {
      if (array[i].materialNo == arrayOrObject) {
        array[i].added = true;
      }
    }*/
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
    } else {
      array[foundIdx].airOrShip = "SC";
    }
    if (quantity) {
      array[foundIdx].qty = quantity;
    }

    return array;
  }
}

function neverMoreThanHKQty(number, hkKg, currHKQty) {
  let lessThanHKQty = number * hkKg;
  if (lessThanHKQty > currHKQty) {
    return currHKQty;
  } else {
    return lessThanHKQty;
  }
}

module.exports = { getFiltered, markBDAdded, markHKAdded, neverMoreThanHKQty };
