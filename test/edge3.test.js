const _ = require("lodash");
const { hk, bd, output } = require("../testData/sept15/87850.js");
const {
  duplicateBefore,
  shouldDuplicate,
  getBeforeActualQuantity,
  getBeforeQty,
  markBefores,
} = require("../javascript/before.js");
const { markAfters } = require("../javascript/after.js");
const { onlyTestVariables } = require("../javascript/tests.js");
const chai = require("chai");
const expect = chai.expect;

describe("edge3", function () {
  let getHK;
  let getBD;
  let getOutput;

  // This will run before each test
  beforeEach(function () {
    getHK = hk;
    getBD = bd;
    getOutput = output;
  });

  it("if less than one sheet, use the original", function () {
    let materialNo = "TAC11187850";
    let output = markBefores(getHK, getBD, materialNo);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    expect(result.getHK).to.deep.equal(result.getOutput);
  });
});
