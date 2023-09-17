const _ = require("lodash");
const { ReadAndWrite } = require("../javascript/readAndWrite.js");
const { getFiltered } = require("../javascript/utility.js");
const {
  duplicateItemWithSC,
  shouldDuplicate,
  getBeforeActualQuantity,
  getBeforeQty,
  markBefores,
} = require("../javascript/before.js");
const bdor = "./testData/bdor_test.xlsx";
const hkor = "./testData/hkor_test.xlsx";
const output = "./testData/output_test.xlsx";
const chai = require("chai");
const expect = chai.expect;

describe("beforeFunctions", function () {
  let readAndWrite;
  let getOutput;
  let getHK;
  let getBD;

  // This will run before each test
  beforeEach(function () {
    readAndWrite = new ReadAndWrite(hkor, bdor, output);
    let result = readAndWrite.init();
    getOutput = result.getOutput;
    getHK = result.getHK;
    getBD = result.getBD;
  });
  // it("should ");

  it("should correctly convert number to date", function () {});
  let materialNo = "TAC00000480";

  it("should never exceed original amount", function () {
    let materialNo = "TAC00083840";
  });
});
