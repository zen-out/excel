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
} = require("./javascript/variables.js");

function doubleCheckTest() {
  let materialNo = "TAC00012070";
  let getFiles = new ReadAndWrite(
    "./data/hkor.wrong.xlsx",
    "./data/bdor.wrong.xlsx",
    "./data/hkor.right.xlsx"
  );
  const { getOutput, getHK, getBD } = getFiles.init(new Date(), true);

  console.log(_.filter(getBD, { materialNo: materialNo }));
  // console.log(_.filter(getHK, { materialNo: materialNo}));
  // console.log(_.filter(getOutput, { materialNo: materialNo }));
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd, materialNo);
  // getFiles.createFile(getAfters.hk, OUTPUT_FILE);
  runTest(getOutput, getAfters.hk, true);
  // additionalLengthTest(HK_FILE, BD_FILE, ANSWERS_FILE, bd);
}
doubleCheckTest();
