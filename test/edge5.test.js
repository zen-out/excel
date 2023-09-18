const _ = require("lodash");
const { hk, bd, output } = require("../testData/88060.js");
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

describe("edge5", function () {
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
    let materialNo = "TAC11188060";
    let output = markBefores(getHK, getBD, materialNo);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    let filtered = _.filter(getAfters.hk, { qty: 1.84 });
    let filtered2 = _.filter(result.getOutput, { qty: 1.84 });
    expect(result.getHK.length).to.equal(3);
    expect(filtered).to.deep.equal(filtered2);
  });
  it("should assign before correctly", function () {
    let materialNo = "TAC11188060";
    let output = markBefores(getHK, getBD, materialNo);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    let filtered = _.filter(result.getHK, { qty: 1.84 });
    let filtered2 = _.filter(result.getOutput, { qty: 1.84 });
    expect(filtered).to.deep.equal(filtered2);
  });

  it("should assign after correctly", function () {
    let materialNo = "TAC11188060";
    let output = markBefores(getHK, getBD, materialNo);
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, getOutput);
    // console.log(result.getHK);
    let filtered = _.filter(result.getHK, { qty: 2.76 });
    let filtered2 = _.filter(result.getOutput, { qty: 2.76 });
    expect(filtered).to.deep.equal(filtered2);
  });
});
