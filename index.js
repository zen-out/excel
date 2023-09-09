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
let materialNo = "TAC00070840";
// do it blind

// beforeTest(reassignedHK);
function afterTest() {
  console.log("");
  console.log("*** HEREEEE ***");
  console.log("");
  let result = markBefores(reassignedHK, reassignedBD, materialNo);
  console.log("");
  console.log("*** HEREEEE ***");
  console.log("");
  let hk = result.hk;
  // console.log("hk", hk);
  runTest(reassignedOutput, hk);

  // let filteredArr = _.filter(hk, (item) =>
  //   _.includes(item.materialNo, "70840")
  // );
  // console.log("filtered", filteredArr);
  // let item_70840 = getAfterQty(hk, filteredArr[0], 31.644);
  // console.log("should be ", item_70840);
}
afterTest();

// not sure if it also applies to afters.
function everyNumber(currHKQty, hkKg, bdQty) {
  if (currHKQty > bdQty) {
    let seeIfWhole = bdQty / hkKg;
    if (Number.isInteger(seeIfWhole)) {
      returnQty = seeIfWhole;
    } else {
      let rounded = Math.ceil(seeIfWhole);
      returnQty = rounded * hkKg;
    }
  } else {
    returnQty = currHKQty;
  }
  console.log(returnQty);
  return returnQty;
}
everyNumber(31.9, 0.9, 12.9);

function testOne() {
  console.log("HEREEEE");
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
