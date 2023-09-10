const _ = require("lodash");
const {
  getBeforeQty,
  getAfterQtyPartOne,
  getAfterQtyPartTwo,
} = require("./functions.js");
const { markBefores } = require("./methods");
function beforeTest(reassignedHK) {
  let filteredArr = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "70840")
  );
  // should be 13.5, 70840
  let first = getBeforeQty(reassignedHK, filteredArr[0], 12.9);
  let filteredArr2 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "73780")
  );
  // should be 7.02, 73780
  let second = getBeforeQty(reassignedHK, filteredArr2[0], 6.046);

  let filteredArr3 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "79620")
  );
  // should be 3.8, 79620
  let third = getBeforeQty(reassignedHK, filteredArr3[0], 2.1);
  let filteredArr4 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "79670")
  );
  // should be 1.8, 79670
  let fourth = getBeforeQty(reassignedHK, filteredArr4[0], 26.731);
  let filteredArr5 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "79770")
  );
  // should be 2.6, 79770
  let fifth = getBeforeQty(reassignedHK, filteredArr5[0], 5.58);
  let filteredArr6 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "81200")
  );
  // should be 13.5, 70840
  let sixth = getBeforeQty(reassignedHK, filteredArr6[0], 37.35);
  let filteredArr7 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "84580")
  );
  let seventh = getBeforeQty(reassignedHK, filteredArr7[0], 6.562); // should be 13.5, 70840

  let filteredArr8 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "87880")
  );
  let eighth = getBeforeQty(reassignedHK, filteredArr8[0], 77.141); // 87880

  let filteredArr9 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "78770")
  );
  let ninth = getBeforeQty(reassignedHK, filteredArr9[0], 8.656); // 78700
  console.debug(
    "should be 13.5",
    _.filter(first, {
      materialNo: "TAC00070840",
      airOrShip: "AC",
      added: true,
    })[0].qty
  );
  console.log(first);
  console.debug(
    "should be 7.02",
    _.filter(second, (item) => _.includes(item.materialNo, "73780"))[0].qty
  );
  console.debug(
    "should be 3.8",
    _.filter(third, (item) => _.includes(item.materialNo, "79620"))[0].qty
  );
  console.debug(
    "should be 1.8",
    _.filter(fourth, (item) => _.includes(item.materialNo, "79670"))[0].qty
  );
  console.debug(
    "should be 2.6",
    _.filter(fifth, (item) => _.includes(item.materialNo, "79770"))[0].qty
  );
  // console.debug(
  //   "should be 37.9",
  //   _.filter(sixth, (item) => _.includes(item.materialNo, "81200"))[0].qty
  // );
  console.debug(
    "should be 7.89",
    _.filter(seventh, (item) => _.includes(item.materialNo, "84580"))[0].qty
  );
  console.debug(
    "should be 27",
    _.filter(eighth, (item) => _.includes(item.materialNo, "87880"))[0].qty
  );

  console.debug(
    "should be 8.9",
    _.filter(ninth, (item) => _.includes(item.materialNo, "78770"))[0].qty
  );
}

function afterTest(reassignedHK, reassignedHK2, reassignedBD) {
  console.debug("");
  console.debug("*** HEREEEE ***");
  console.debug("");
  // HERE
  let result = markBefores(reassignedHK, reassignedBD, "materialNo");
  let hk = result.hk;
  // console.log(_.sortBy(hk, "materialNo"));
  // console.log(_.filter(hk, { added: false }));

  // console.log(_.filter(hk, { materialNo: "TAC11181200" }));
  // first
  let filteredArr = _.filter(
    hk,
    (item) => _.includes(item.materialNo, "70840") && item.added == false
  );

  if (filteredArr.length) {
    let item_70840 = getAfterQtyPartOne(hk, filteredArr[0], 31.644);
    console.debug("should be 18.4", item_70840);
  } else {
    console.debug("test case for part 70840");
  }
  // second
  /*
  let filteredArr2 = _.filter(
    hk,
    (item) => _.includes(item.materialNo, "73780") && item.added == false
  );
  if (filteredArr2.length) {
    // let item_73780 = getAfterQtyPartOne(hk, filteredArr2[0], 6.046);
    // console.debug("should be 15.28", item_73780);
  } else {
    let test2 = getAfterQtyPartTwo(reassignedHK2, hk, "TAC11173780");
    console.debug("should be 15.28", test2);
  }

  // third
  let filteredArr3 = _.filter(
    hk,
    (item) => _.includes(item.materialNo, "81200") && item.added == false
  );
  // console.debug(filteredArr3);
  if (filteredArr3.length) {
    let item_81200 = getAfterQtyPartOne(hk, filteredArr3[0], 36.308);
    console.debug("should be 36.3", item_81200);
    // keep marking the item
    let item_81200_pt2 = getAfterQtyPartOne(hk, filteredArr3[1], 36.308);
    console.debug("should be 1.9", item_81200_pt2);
  } else {
    console.debug("test case for 81200");
  }

  // fourth
  let filteredArr4 = _.filter(
    hk,
    (item) => _.includes(item.materialNo, "81440") && item.added == false
  );
  if (filteredArr4.length) {
    let item_81400 = getAfterQtyPartOne(hk, filteredArr4[0], 1.918);
    console.debug("should be 2.6", item_81400);
    // keep marking the item
  } else {
    console.debug("test case for item_81400");
  }

  // fifth
  let filteredArr5 = _.filter(
    hk,
    (item) => _.includes(item.materialNo, "84580") && item.added == false
  );
  if (filteredArr5.length) {
    let item_84580 = getAfterQtyPartOne(hk, filteredArr5[0]);
    console.debug("should be 22.71", item_84580);
    // keep marking the item
  } else {
    let test2 = getAfterQtyPartTwo(reassignedHK2, hk, "TAC11184580");
    console.debug("should be 22.71", test2);
  }

  // ABOVE
  console.debug("");
  console.debug("*** HEREEEE ***");
  console.debug("");
  // console.debug("hk", hk);
  runTest(reassignedOutput, hk);
  */
}
function runTest(reassignedOutput, hkOutput) {
  console.debug("");
  console.debug("*** TEST ***");
  let getHK = _.map(hkOutput, (item) =>
    _.pick(item, ["qty", "materialNo", "airOrShip"])
  );
  let getOutput = _.map(reassignedOutput, (item) =>
    _.pick(item, ["qty", "materialNo", "airOrShip"])
  );
  let similarObjects = _.filter(getHK, (obj1) =>
    _.some(getOutput, (obj2) => _.isEqual(obj1, obj2))
  );
  let difference = _.differenceWith(getHK, getOutput, _.isEqual);
  console.debug("wrong", difference, "wrong");
  console.debug(`NICE JOB: ${similarObjects.length}/${getOutput.length}`);
  console.debug(
    `NICE JOB: ${((similarObjects.length / getOutput.length) * 100).toFixed(
      2
    )}%`
  );
  console.debug("*** TEST END ***");
  console.debug("");
}

module.exports = { runTest, beforeTest, afterTest };

// remove
