console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const _ = require("lodash");
const { runTest, additionalLengthTest } = require("./javascript/tests.js");
const { markBefores } = require("./javascript/before.js");
const { markAfters } = require("./javascript/after.js");
const { ReadAndWrite } = require("./javascript/readAndWrite.js");
const {
  DOUBLE_CHECK_HK,
  DOUBLE_CHECK_BD,
  DOUBLE_CHECK_OUTPUT,
} = require("./javascript/variables.js");

function doubleCheckTest() {
  let materialNo = "TAC00012070";
  let getFiles = new ReadAndWrite(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT
  );
  const { getOutput, getHK, getBD } = getFiles.init(true);
  // console.log(_.filter(getBD, { materialNo: "TAC11188060" }));
  // console.log(_.filter(getHK, { materialNo: "TAC11188060" }));
  // console.log(_.filter(getOutput, { materialNo: "TAC11188060" }));
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
