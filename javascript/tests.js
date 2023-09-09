const _ = require("lodash");
const { getBeforeQty, getAfterQty } = require("./functions.js");

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
  console.log("should be 13.5", first);
  console.log("should be 7.02", second);
  console.log("should be 3.8", third);
  console.log("should be 1.8", fourth);
  console.log("should be 2.6", fifth);
  console.log("should be 38", sixth);
  console.log("should be 7.89", seventh);
  console.log("should be 27", eighth);
  console.log("should be 8.9", ninth);
}
function runTest(reassignedOutput, hkOutput) {
  console.log("");
  console.log("*** TEST ***");
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
  console.log("wrong", difference, "wrong");
  console.log(`NICE JOB: ${similarObjects.length}/${getOutput.length}`);
  console.log(
    `NICE JOB: ${((similarObjects.length / getOutput.length) * 100).toFixed(
      2
    )}%`
  );
  console.log("*** TEST END ***");
  console.log("");
}

module.exports = { runTest, beforeTest };

// remove
