const _ = require("lodash");
const { getBeforeActualQuantity } = require("../javascript/before.js");
const { getFiltered } = require("../javascript/utility.js");
const { hk, bd, output } = require("../testData/dates.js");
const chai = require("chai");
const expect = chai.expect;

describe("beforeFunctions", function () {
  let getHK;
  let getBD;
  let getOutput;

  // This will run before each test
  beforeEach(function () {
    getHK = hk;
    getBD = bd;
    getOutput = output;
  });
  it("should account for BB unless assignMaxInTransit > dateOfIssue 0", function () {
    let materialNo = "TAC11179670";
    let filtered = getFiltered(getBD, materialNo);
    let output = getBeforeActualQuantity(getBD, filtered, materialNo);
    // console.log(output.getOutput);
    expect(output.actualQuantity).to.equal(22.602);
  });
  it("if W is before 35 then use BB column (and ba is before W) column", function () {
    let materialNo = "TAC00070840";
    let filtered = getFiltered(getBD, materialNo);
    let output = getBeforeActualQuantity(getBD, filtered, materialNo);
    expect(output.actualQuantity).to.equal(12.9);
  });
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
