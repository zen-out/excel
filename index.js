console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const _ = require("lodash");
const { beforeTest, runTest, afterTest } = require("./javascript/tests.js");
const {
  getBeforeQty,
  getAfterQty,
  getAfterQtyPartTwo,
  markBDAdded,
} = require("./javascript/functions.js");
const { ReadAndWrite } = require("./javascript/readAndWrite.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
const {
  HK_FILE,
  BD_FILE,
  ANSWERS_FILE,
  DOUBLE_CHECK_HK,
  DOUBLE_CHECK_BD,
  DOUBLE_CHECK_OUTPUT,
} = require("./javascript/variables.js");
let materialNo = "f";

function additionalLengthTest(bdAfter) {
  let getFiles = new ReadAndWrite(HK_FILE, BD_FILE, ANSWERS_FILE);
  const { getOutput, getHK, getBD } = getFiles.init();
  let beforeBD = _.filter(getBD, { before: true, added: false });
  // console.log(bdBefore, "bd");
  let afterBD = _.filter(bdAfter, { before: true, added: true });
  if (beforeBD.length !== afterBD.length) {
    // console.log(beforeBD[0]);
    let difference = _.differenceWith(beforeBD, afterBD, _.isEqual);
    console.log("*** FAILED length test bd ***");
    // console.log(difference);
    // console.log("ORIGINAL LENGTH", beforeBD.length);
    // console.log("AFTER LENGTH", afterBD.length);
  } else {
    console.log("*** bd length test passed ***");
    console.log("");
  }
}
function alwaysRunThisTest() {
  let getFiles = new ReadAndWrite(HK_FILE, BD_FILE, ANSWERS_FILE);
  const { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd);
  runTest(getOutput, getAfters.hk);
  // additionalLengthTest(bd);
}
alwaysRunThisTest();

function doubleCheckTest() {
  let getFiles = new ReadAndWrite(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT
  );
  const { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd);
  // console.log(getAfters.hk);

  runTest(getOutput, getAfters.hk);
}

doubleCheckTest();
