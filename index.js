const _ = require("lodash");
const { HK_FILE, BD_FILE, days } = require("./VARIABLES.js");
const {
  readFile,
  createFile,
  reassignKeys,
} = require("./javascript/helper.js");
const { beforeTest, runTest } = require("./javascript/tests.js");
const { getBeforeQty, getAfterQty } = require("./javascript/functions.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
const hkFile = readFile(`./data/${HK_FILE}`);
const bdFile = readFile(`./data/${BD_FILE}`);
const actualOutput = readFile(`./data/originalOutput.xlsx`);
let reassignedOutput = reassignKeys(actualOutput, "hk");
let reassignedHK = reassignKeys(hkFile, "hk");
let reassignedBD = reassignKeys(bdFile, "bd");
let materialNo = "TAC11181200";
// do it blind

function afterTest() {
  let { hk, bd } = markBefores(reassignedHK, reassignedBD, materialNo);
  let filteredArr = _.filter(hk, (item) =>
    _.includes(item.materialNo, "70840")
  );
  console.log(filteredArr);
  // let first = getAfterQty(hk, filteredArr[0], 12.9); // should be 13.5, 70840
}
afterTest();

function testOne() {
  let { hk, bd } = markBefores(reassignedHK, reassignedBD, materialNo);
  runTest(reassignedOutput, hk);

  let filteredHK = _.filter(reassignedHK, { materialNo: materialNo });
  let filteredBD = _.filter(reassignedBD, { materialNo: materialNo });
  // runTest(reassignedOutput, hk);
  // let get_after = markAfters(hk, bd, materialNo);
  // let _test = _.filter(get_after.hk, { materialNo: materialNo });
  // let getFinalHK = get_after.hk;
  // createFile(getFinalHK);
}
// testOne();
