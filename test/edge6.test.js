const _ = require("lodash");
const { hk, bd, output } = require("../testData/sept18/2920.js");
const { markBefores } = require("../javascript/before.js");
const { markAfters } = require("../javascript/after.js");
const { onlyTestVariables } = require("../javascript/tests.js");
const chai = require("chai");
const expect = chai.expect;

describe("edge6", function () {
  let getHK;
  let getBD;
  let getOutput;

  // This will run before each test
  beforeEach(function () {
    getHK = hk;
    getBD = bd;
    getOutput = output;
  });

  it("should account for negative numbers", function () {
    let materialNo = "TAC00102920";
    let output = markBefores(getHK, getBD, materialNo);
    // console.log(output.bd);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    // result.getHK, result.getOutput
    expect(result.getHK).to.deep.equal(result.getOutput);
  });
});
