const _ = require("lodash");
const { hk, bd, output } = require("../testData/83840.js");
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

  it("should assign bd correctly", function () {
    let materialNo = "TAC00083840";
    let output = markBefores(getHK, getBD, materialNo);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    expect(result.getHK).to.deep.equal(result.getOutput);
    // let first = _.filter(result.getHK, { qty: 0 });
    // let outputFirst = _.filter(result.getOutput, { qty: 0.65 });
    // expect(first).to.deep.equal(outputFirst);
  });
});
