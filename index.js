console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const _ = require("lodash");
const {
  beforeTest,
  runTest,
  afterTest,
  additionalLengthTest,
} = require("./javascript/tests.js");
const { getBeforeQty, markBefores } = require("./javascript/before.js");
const {
  getAfterQty,
  getAfterQtyPartTwo,
  markAfters,
  getAfterActualQuantity,
} = require("./javascript/after.js");
const { ReadAndWrite } = require("./javascript/readAndWrite.js");
const {
  HK_FILE,
  BD_FILE,
  ANSWERS_FILE,
  DOUBLE_CHECK_HK,
  DOUBLE_CHECK_BD,
  DOUBLE_CHECK_OUTPUT,
} = require("./javascript/variables.js");

function doubleCheckTest() {
  let problems = ["TAC00010400", "TAC00010420"];
  let materialNo = "TAC00012070";
  let getFiles = new ReadAndWrite(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT
  );
  const { getOutput, getHK, getBD } = getFiles.init(true);
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd, materialNo);
  getFiles.createFile(getAfters.hk, "test_output_3.xlsx", getOutput);
  let diff = runTest(getOutput, getAfters.hk);
  let filtered = _.filter(diff.correct, { airOrShip: "AC" });
  additionalLengthTest(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT,
    bd
  );
}
// doubleCheckTest();

function alwaysRunThisTest() {
  let materialNo = "TAC00070840";
  let getFiles = new ReadAndWrite(HK_FILE, BD_FILE, ANSWERS_FILE);
  const { getOutput, getHK, getBD } = getFiles.init();
  // console.log(getHK);
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  // beforeTest(hk);
  let getAfters = markAfters(hk, bd);
  // getFiles.createFile(getAfters.hk, "test_output_1.xlsx", getOutput);
  // runTest(getOutput, getAfters.hk);
  // additionalLengthTest(HK_FILE, BD_FILE, ANSWERS_FILE, bd);
}
alwaysRunThisTest();
