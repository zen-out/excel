const _ = require("lodash");
const { hk, bd, output } = require("../testData/54930.js");
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

describe("edge4", function () {
  let getHK;
  let getBD;
  let getOutput;

  // This will run before each test
  beforeEach(function () {
    getHK = hk;
    getBD = bd;
    getOutput = output;
  });

  it("should assign bd correctly", function () {
    let materialNo = "TAC11154930";
    let output = markBefores(getHK, getBD, materialNo);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    expect(result.getHK).to.deep.equal(result.getOutput);
  });
});
