console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const _ = require("lodash");
const { runTest, additionalLengthTest } = require("./javascript/tests.js");
const { markBefores } = require("./javascript/before.js");
const { markAfters } = require("./javascript/after.js");
const { ReadAndWrite } = require("./javascript/readAndWrite.js");
const {
  HK_FILE,
  BD_FILE,
  OUTPUT_FILE,
  ANSWERS_FILE,
  CURRENT_DATE,
} = require("./javascript/variables.js");

function doubleCheckTest() {
  let materialNo = "TAC00012070";
  let getFiles = new ReadAndWrite(HK_FILE, BD_FILE, ANSWERS_FILE);
  const { getOutput, getHK, getBD } = getFiles.init(CURRENT_DATE);
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd, materialNo);
  getFiles.createFile(getAfters.hk, OUTPUT_FILE);
}
doubleCheckTest();
