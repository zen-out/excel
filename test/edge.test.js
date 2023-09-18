const _ = require("lodash");
const { hk, bd, output } = require("../testData/81200.js");
const { markBefores } = require("../javascript/before.js");
const { markAfters } = require("../javascript/after.js");
const { onlyTestVariables } = require("../javascript/tests.js");
const chai = require("chai");
const expect = chai.expect;

describe("edge", function () {
  let getHK;
  let getBD;
  let getOutput;

  // This will run before each test
  beforeEach(function () {
    getHK = hk;
    getBD = bd;
    getOutput = output;
  });

  it("should assign bd correctly, if there's many to many", function () {
    let output = markBefores(getHK, getBD, "TAC11181200");
    let getAfters = markAfters(output.hk, output.bd);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    let first = _.filter(result.getHK, { qty: 36.3 });
    let outputFirst = _.filter(result.getOutput, { qty: 36.3 });
    expect(first).to.deep.equal(outputFirst);
    let second = _.filter(result.getHK, { qty: 37.9 });
    let outputSecond = _.filter(result.getOutput, { qty: 37.9 });
    expect(second).to.deep.equal(outputSecond);
    let third = _.filter(result.getHK, { qty: 1.9 });
    let outputThird = _.filter(result.getOutput, { qty: 1.9 });
    expect(third).to.deep.equal(outputThird);
  });
});
