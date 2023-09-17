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
  getBDAfterActualQuantity,
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
  runTest(getOutput, getAfters.hk, true);
  additionalLengthTest(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT,
    bd
  );
}
doubleCheckTest();

function alwaysRunThisTest() {
  let materialNo = "TAC00070840";
  let getFiles = new ReadAndWrite(
    "./testData/hkor_test.xlsx",
    "./testData/bdor_test.xlsx",
    "./testData/output_test.xlsx"
    // "./testData/hkor_test.xlsx",
    // "./testData/bdor_test.xlsx",
    // "./testData/output_test.xlsx"
  );
  const { getOutput, getHK, getBD } = getFiles.init();
  // console.log(_.filter(getBD, { materialNo: "TAC00083840" }));
  // console.log(_.filter(getHK, { materialNo: "TAC00083840" }));
  // console.log(_.filter(getOutput, { materialNo: "TAC00083840" }));

  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd);
  runTest(getOutput, getAfters.hk, true);
  additionalLengthTest(HK_FILE, BD_FILE, ANSWERS_FILE, bd);
}
// alwaysRunThisTest();
