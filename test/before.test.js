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
  it("should account for BB unless assignMaxInTransit > dateOfIssue 0", function () {
    let materialNo = "TAC11179670";
    let filtered = getFiltered(getBD, materialNo);
    let output = getBeforeActualQuantity(getBD, filtered, materialNo);
    console.log(output.getOutput);
    expect(output.actualQuantity).to.equal(22.602);
  });
  it("if W is before 35 then use BB column (and ba is before W) column", function () {
    let materialNo = "TAC00070840";
    let filtered = getFiltered(getBD, materialNo);
    let output = getBeforeActualQuantity(getBD, filtered, materialNo);
    expect(output.actualQuantity).to.equal(12.9);
  });

  it("should return 0 as actual quantity if conditions apply", function () {
    // let materialNo = "TAC00012070";
    // let bd = getFiltered(getBD, materialNo);
    // let hk = getFiltered(getHK, materialNo);
    // let result = getBeforeActualQuantity(getBD, bd, materialNo);
    // expect(result.actualQuantity).to.equal(0);
  });
  it("should split when hk quantity is greater than before", function () {});

  it("should correctly convert number to date", function () {});

  it("should always be at least the original amount", function () {
    let materialNo = "TAC00066440";
    let materialNo2 = "TAC11154940";
    let materialNo3 = "TAC11187850";
    let filtered = getFiltered(getBD, materialNo3);
    let output = getBeforeActualQuantity(getBD, filtered, materialNo3);
    console.log(output.actualQuantity);
    let expected = 74.96;
  });
});
