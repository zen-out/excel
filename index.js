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
function getBeforeTest() {
  let getFiles = new ReadAndWrite();
  let { getOutput, getHK, getBD } = getFiles.init();
  // markAfters(getHK, getBD);
  beforeTest(getHK);
}
getBeforeTest();

function getAfterTest() {
  let getFiles = new ReadAndWrite();
  let { getOutput, getHK, getBD } = getFiles.init();
  let getFiles2 = new ReadAndWrite();
  afterTest(getHK, getFiles2.getHK, getBD);
}
// getAfterTest();
// let reassignedHK2 = reassignKeys(hkFile, "hk");

function alwaysRunThisTest() {
  let getFiles = new ReadAndWrite();
  let { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  runTest(getOutput, hk);
}
alwaysRunThisTest();
