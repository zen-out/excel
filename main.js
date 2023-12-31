console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const fs = require("fs");

const path = require("path");
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
  let materialNo = "TAC11165390";
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
  getFiles.createFile(getAfters.hk, "./data/sample_4.xlsx");
  let testOutput = runTest(getOutput, getAfters.hk, true);
  // let filteredOutput = _.filter(getOutput, { materialNo: materialNo });
  // let filteredHK = _.filter(getHK, { materialNo: materialNo });
  // let filteredBD = _.filter(getBD, { materialNo: materialNo });
  // below is for refreshing data, no need to run right now
  // let getPath = `./testData/sept23`;
  // writeData(getPath, materialNo, filteredHK, filteredBD, filteredOutput);
  // refreshData(getPath, getFiles, testOutput);
}
doubleCheckTest();

function refreshData(getPath, getFiles, testOutput) {
  const result = getFiles.init(new Date("2023-09-21"), true);
  if (fs.existsSync(getPath)) {
    fs.rmdirSync(getPath, { recursive: true });
    console.log(`${getPath} is deleted!`);
  }
  for (let i = 0; i < testOutput.difference.length; i++) {
    let obj = testOutput.difference[i];
    let first = _.filter(result.getHK, { materialNo: obj.materialNo });
    let second = _.filter(result.getBD, { materialNo: obj.materialNo });
    let third = _.filter(result.getOutput, { materialNo: obj.materialNo });
    writeData(getPath, obj.materialNo, first, second, third);
  }
}
function writeData(getPath, materialNo, hk, bd, output) {
  let fileContent = `
  let hk = ${JSON.stringify(hk)};
  let bd = ${JSON.stringify(bd)};
  let output = ${JSON.stringify(output)};
  module.exports = {hk, bd, output};
  `;
  try {
    if (!fs.existsSync(getPath)) {
      fs.mkdirSync(getPath, { recursive: true });
    }
    let file = `${getPath}/${materialNo}.js`;
    if (fs.existsSync(file)) {
      // File exists, remove it
      fs.unlinkSync(file);
    }
    fs.writeFileSync(file, fileContent);
  } catch (error) {
    console.log("error", error);
  }
}
