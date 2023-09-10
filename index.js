console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const _ = require("lodash");
const { beforeTest, runTest, afterTest } = require("./javascript/tests.js");
const {
  getBeforeQty,
  getAfterQtyPartOne,
  getAfterQtyPartTwo,
} = require("./javascript/functions.js");
const { ReadAndWrite } = require("./javascript/readAndWrite.js");
const { markBefores, markAfters } = require("./javascript/methods.js");

let materialNo = "TAC11181200";
// do it blind
function firstTest() {
  let getFiles = new ReadAndWrite();
  let { getOutput, getHK, getBD } = getFiles.init();
  beforeTest(getHK);
  let test_filter = _.filter(getHK, { materialNo: "TAC11181200" });
  // console.debug("TEST", test_filter);
}
firstTest();
// let reassignedHK2 = reassignKeys(hkFile, "hk");
// afterTest(reassignedHK, reassignedHK2, reassignedBD);

function alwaysRunThisTest() {
  let getFiles = new ReadAndWrite();
  let { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  runTest(getOutput, hk);
}
alwaysRunThisTest();
