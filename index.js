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
const {
  getBeforeQty,
  getAfterQty,

  getAfterQtyPartTwo,
  markBDAdded,
} = require("./javascript/functions.js");
const {
  markBefores,
  markAfters,
  getAfterActualQuantity,
} = require("./javascript/methods.js");

const { ReadAndWrite } = require("./javascript/readAndWrite.js");
const {
  HK_FILE,
  BD_FILE,
  ANSWERS_FILE,
  DOUBLE_CHECK_HK,
  DOUBLE_CHECK_BD,
  DOUBLE_CHECK_OUTPUT,
} = require("./javascript/variables.js");

function whatsGoingOn() {
  let materialNo = "TAC00002210";
  let getFiles = new ReadAndWrite(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT
  );
  const { getOutput, getHK, getBD } = getFiles.init(true);
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  console.log(bd);
  let bd_filter = _.filter(getBD, { materialNo: materialNo });
  console.log(bd_filter);
  let { seaShipFlag, actualQuantity } = getAfterActualQuantity(bd, bd_filter);
  console.log(actualQuantity);
}
whatsGoingOn();
function doubleCheckTest() {
  let materialNo = "TAC00002210";
  let getFiles = new ReadAndWrite(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT
  );
  const { getOutput, getHK, getBD } = getFiles.init(true);
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let filtered = _.filter(hk, { materialNo: materialNo });
  console.log(filtered);
  let getAfters = markAfters(hk, bd, materialNo);
  runTest(getOutput, getAfters.hk);
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
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd);
  runTest(getOutput, getAfters.hk);
  additionalLengthTest(HK_FILE, BD_FILE, ANSWERS_FILE, bd);
}
alwaysRunThisTest();
