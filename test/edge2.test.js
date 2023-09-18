const _ = require("lodash");
const { hk, bd, output } = require("../testData/sept15/83840.js");
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

describe("edge2", function () {
  let getHK;
  let getBD;
  let getOutput;

  // This will run before each test
  beforeEach(function () {
    getHK = hk;
    getBD = bd;
    getOutput = output;
  });

  it("SC should maintain the same depending on bd", function () {
    let materialNo = "TAC00083840";
    let output = markBefores(getHK, getBD, materialNo);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    expect(result.getHK).to.deep.equal(result.getOutput);
  });
});
