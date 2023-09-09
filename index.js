const _ = require("lodash");
const { HK_FILE, BD_FILE, days } = require("./VARIABLES.js");
const {
  readFile,
  createFile,
  reassignKeys,
} = require("./javascript/helper.js");
const {
  getBeforeQty,
  getBeforeQty2,
  getAfterQty,
} = require("./javascript/functions.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
const hkFile = readFile(`./data/${HK_FILE}`);
const bdFile = readFile(`./data/${BD_FILE}`);
const actualOutput = readFile(`./data/originalOutput.xlsx`);
let reassignedOutput = reassignKeys(actualOutput, "hk");
let reassignedHK = reassignKeys(hkFile, "hk");
let reassignedBD = reassignKeys(bdFile, "bd");
let materialNo = "TAC11181200";
// do it blind

function testTwoAndAHalf() {
  let currHK1;
  let currObj = {
    materialNo: "TAC11181200",
    kg: 1.9,
    added: false,
    description: "Acetate#ELSH0015 165x1450x6.0/1.9",
    qty: 36.3,
    airOrShip: "",
    remarks: "",
  };
  // let first = getBeforeQty2(reassignedHK, currObj, 1.9, 37.35);
  let filteredArr = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "70840")
  );
  let first = getBeforeQty2(reassignedHK, filteredArr[0], 12.9); // should be 13.5, 70840
  let filteredArr2 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "73780")
  );
  let second = getBeforeQty2(reassignedHK, filteredArr2[0], 6.046); // should be 7.02, 73780

  let filteredArr3 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "79620")
  );
  let third = getBeforeQty2(reassignedHK, filteredArr3[0], 2.1); // should be 3.8, 79620

  let filteredArr4 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "79670")
  );
  let fourth = getBeforeQty2(reassignedHK, filteredArr4[0], 26.731); // should be 1.8, 79670

  let filteredArr5 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "79770")
  );
  let fifth = getBeforeQty2(reassignedHK, filteredArr5[0], 5.58); // should be 2.6, 79770
  let filteredArr6 = _.filter(reassignedHK, (item) =>
    _.includes(item.materialNo, "81200")
  );
  let sixth = getBeforeQty2(reassignedHK, filteredArr6[0], 37.35); // should be 13.5, 70840
  console.log("should be 13.5", first);
  console.log("should be 7.02", second);
  console.log("should be 3.8", third);
  console.log("should be 1.8", fourth);
  console.log("should be 2.6", fifth);
  console.log("should be ", sixth);
}
testTwoAndAHalf();
function testTwo() {
  let first = getBeforeQty(31.9, 0.9, 12.9); // should be 13.5, 70840
  let second = getBeforeQty(22.3, 1.17, 6.046); // should be 7.02, 73780
  let third = getBeforeQty(3.8, 1.9, 2.1); // should be 3.8, 79620
  let fourth = getBeforeQty(1.8, 0.92, 26.731); // should be 1.8, 79670
  let fifth = getBeforeQty(2.6, 1.3, 5.58); // should be 2.6, 79770
  console.log("should be 13.5", first);
  console.log("should be 7.02", second);
  console.log("should be 3.8", third);
  console.log("should be 1.8", fourth);
  console.log("should be 2.6", fifth);
  console.log("should be ", sixth);
}
// testTwo();
function testOne() {
  let testResult = markBefores(reassignedHK, reassignedBD, materialNo);
  runTest(testResult.hk);
  let filteredHK = _.filter(reassignedHK, { materialNo: materialNo });
  let filteredBD = _.filter(reassignedBD, { materialNo: materialNo });
  let { hk, bd } = markBefores(filteredHK, filteredBD, materialNo);
  // let get_after = markAfters(hk, bd, materialNo);
  // let _test = _.filter(get_after.hk, { materialNo: materialNo });
  // console.log("/n/nTEST/n/n", _test);
  // let getFinalHK = get_after.hk;
  // createFile(getFinalHK);
}
// testOne();

function runTest(hkOutput) {
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
