const _ = require("lodash");
const { hk, bd, output } = require("../testData/originalTest.js");
const { markBefores } = require("../javascript/before.js");
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
    let output = markBefores(getHK, getBD, "TAC00083840");
    let getAfters = markAfters(output.hk, output.bd);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    let sortedHK = _.sortBy(result.getHK, ["materialNo", "qty"], ["asc"]);
    let sortedOutput = _.sortBy(
      result.getOutput,
      ["materialNo", "qty"],
      ["asc", "asc"]
    );
    expect(sortedHK).to.deep.equal(sortedOutput);
  });
});
