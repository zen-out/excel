console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const fs = require("fs");
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
  let materialNo = "TAC00057540";
  let getFiles = new ReadAndWrite(
    "./data/hkor_4.xlsx",
    "./data/bdor_4.xlsx",
    "./data/output_4.xlsx"
  );
  const { getOutput, getHK, getBD } = getFiles.init(
    new Date("2023-09-21"),
    true
  );
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd, materialNo);
  // console.log(getAfters.hk);
  // getFiles.createFile(getAfters.hk, "./data/sample_4.xlsx");
  // console.log(getOutput[0]);
  // console.log(getAfters.hk[0]);
  let testOutput = runTest(getOutput, getAfters.hk, true);
  for (let i = 0; i < testOutput.difference.length; i++) {
    let obj = testOutput.difference[i];
    let first = _.filter(getHK, { materialNo: obj.materialNo });
    let second = _.filter(getBD, { materialNo: obj.materialNo });
    let third = _.filter(getOutput, { materialNo: obj.materialNo });
    // console.log(first);
    // if (first == undefined) {
    //   console.log(first);
    // } else {
    writeData(obj.materialNo, first, second, third);
    // }
  }
  // additionalLengthTest(HK_FILE, BD_FILE, ANSWERS_FILE, bd);
}
doubleCheckTest();

function writeData(materialNo, hk, bd, output) {
  let fileContent = `
  let hk = ${JSON.stringify(hk)};
  let bd = ${JSON.stringify(bd)};
  let output = ${JSON.stringify(output)};
  module.exports = {hk, bd, output};
  `;
  let path = `./testData/sept23`;
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    let file = `${path}/${materialNo}.js`;
    if (fs.existsSync(file)) {
      // File exists, remove it
      fs.unlinkSync(file);
    }
    fs.writeFileSync(file, fileContent);
  } catch (error) {
    console.log("error", error);
  }
}
