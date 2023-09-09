const _ = require("lodash");
const { HK_FILE, BD_FILE, days } = require("./VARIABLES.js");
const {
  readFile,
  createFile,
  reassignKeys,
} = require("./javascript/helper.js");
const { getBeforeQty, getAfterQty } = require("./javascript/functions.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
const hkFile = readFile(`./data/${HK_FILE}`);
const bdFile = readFile(`./data/${BD_FILE}`);
const actualOutput = readFile(`./data/originalOutput.xlsx`);
let reassignedOutput = reassignKeys(actualOutput, "hk");
let reassignedHK = reassignKeys(hkFile, "hk");
let reassignedBD = reassignKeys(bdFile, "bd");
let materialNo = "TAC11181440";
// do it blind
function testTwo() {
  let first = getBeforeQty(31.9, 0.9, 12.9); // should be 13.5, 70840
  let second = getBeforeQty(22.3, 1.17, 6.046); // should be 7.02, 73780
  let third = getBeforeQty(3.8, 1.9, 2.1); // should be 3.8, 79620
  let fourth = getBeforeQty(1.8, 0.92, 26.731); // should be 1.8, 79670
  let fifth = getBeforeQty();
  console.log("should be 13.5", first);
  console.log("should be 7.02", second);
  console.log("should be 3.8", third);
  console.log("should be 1.8", fourth);
}
// testTwo();
function testOne() {
  console.log(reassignedHK);
  let testResult = markBefores(reassignedHK, reassignedBD, materialNo);
  // console.log("before", hk);
  runTest(testResult.hk);
  // let filteredHK = _.filter(reassignedHK, { materialNo: materialNo });
  // let filteredBD = _.filter(reassignedBD, { materialNo: materialNo });
  // let { hk, bd } = markBefores(filteredHK, filteredBD, materialNo);
  // console.log(hk[0], "what?");
  // let _test1 = _.filter(hk, { added: true });
  // console.log(_test1);
  // let _test1 = _.filter(hk, { materialNo: materialNo });
  // console.log("/n/nTEST/n/n", _test1);
  // let get_after = markAfters(hk, bd, materialNo);
  // let _test = _.filter(get_after.hk, { materialNo: materialNo });
  // console.log("/n/nTEST/n/n", _test);
  // let getFinalHK = get_after.hk;
  // createFile(getFinalHK);
  // let filterHK = _.filter(reassignedHK, { materialNo: materialNo });
  // console.log(filterHK.length);
  // console.log(filterHK);
  // let getItem = eachItem(filterHK, filterBD, materialNo);
}
testOne();

function runTest(hkOutput) {
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
}
