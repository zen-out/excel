console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const { HK_FILE, BD_FILE, ANSWERS_FILE } = require("./javascript/variables.js");
const _ = require("lodash");
const {
  readFile,
  createFile,
  reassignKeys,
} = require("./javascript/helper.js");
const { beforeTest, runTest, afterTest } = require("./javascript/tests.js");
const {
  getBeforeQty,
  getAfterQtyPartOne,
  getAfterQtyPartTwo,
} = require("./javascript/functions.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
const hkFile = readFile(HK_FILE);
const bdFile = readFile(BD_FILE);
const actualOutput = readFile(ANSWERS_FILE);
function helperTest() {
  let getOutput = reassignKeys(actualOutput, "hk");
  let getHK = reassignKeys(hkFile, "hk");
  let getBD = reassignKeys(bdFile, "bd");
  return { getOutput, getHK, getBD };
}

let materialNo = "TAC11181200";
// do it blind
function firstTest() {
  let { getOutput, getHK, getBD } = helperTest();
  beforeTest(getHK);
  let test_filter = _.filter(getHK, { materialNo: "TAC11181200" });
  // console.debug("TEST", test_filter);
}
// firstTest();
// let reassignedHK2 = reassignKeys(hkFile, "hk");
// afterTest(reassignedHK, reassignedHK2, reassignedBD);

function alwaysRunThisTest() {
  let { getOutput, getHK, getBD } = helperTest();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  runTest(getOutput, hk);
}
alwaysRunThisTest();
