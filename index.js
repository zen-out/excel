const _ = require("lodash");
const {
  readFile,
  createFile,
  reassignKeys,
} = require("./javascript/helper.js");
const HK_FILE = "hkFile.xlsx";
const BD_FILE = "bdFile.xlsx";
const { beforeTest, runTest, afterTest } = require("./javascript/tests.js");
const {
  getBeforeQty,
  getAfterQtyPartOne,
  getAfterQtyPartTwo,
} = require("./javascript/functions.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
const hkFile = readFile(`./data/${HK_FILE}`);
const bdFile = readFile(`./data/${BD_FILE}`);
const actualOutput = readFile(`./data/originalOutput.xlsx`);
// let reassignedOutput = reassignKeys(actualOutput, "hk");
// let reassignedHK = reassignKeys(hkFile, "hk");
// let reassignedBD = reassignKeys(bdFile, "bd");
let materialNo = "TAC11181200";
// do it blind

let reassignedHK2 = reassignKeys(hkFile, "hk");
// beforeTest(reassignedHK);
// afterTest(reassignedHK, reassignedHK2, reassignedBD);

function testOne() {
  let newHK = reassignKeys(hkFile, "hk");

  let newBD = reassignKeys(bdFile, "bd");
  // console.log(newBD);
  let newOutput = reassignKeys(actualOutput, "hk");
  let { hk, bd } = markBefores(newHK, newBD, materialNo);
  runTest(newOutput, hk);
}
testOne();
