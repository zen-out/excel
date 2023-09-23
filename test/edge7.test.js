const _ = require("lodash");
const { hk, bd, output } = require("../testData/sept23/TAC11173790.js");
const secondTest = require("../testData/sept23/TAC11166860.js");
const thirdTest = require("../testData/sept23/TAC11173800.js");
const { markBefores } = require("../javascript/before.js");
const { markAfters } = require("../javascript/after.js");
const { onlyTestVariables } = require("../javascript/tests.js");
const chai = require("chai");
const expect = chai.expect;

describe("edge7", function () {
  let getHK;
  let getBD;
  let getOutput;

  // This will run before each test
  beforeEach(function () {
    getHK = hk;
    getBD = bd;
    getOutput = output;
  });

  // it("start with two, end with two", function () {
  //   let materialNo = "TAC11173790";
  //   let output = markBefores(hk, bd, materialNo);
  //   // output.hk
  //   let filtered = _.filter(output.hk, { materialNo: materialNo });
  //   // console.log(filtered, "has it already been marked?");
  //   let getAfters = markAfters(output.hk, output.bd, materialNo);
  //   let result = onlyTestVariables(getAfters.hk, getOutput);
  //   // console.log(result.getHK);
  //   // result.getHK, result.getOutput
  //   expect(result.getHK).to.deep.equal(result.getOutput);
  // });
  it("start with two, end with two", function () {
    let materialNo = "TAC11166860";
    let output = markBefores(secondTest.hk, secondTest.bd, materialNo);
    // output.hk
    let filtered = _.filter(output.hk, { materialNo: materialNo });
    // console.log(filtered, "has it already been marked?");
    let getAfters = markAfters(output.hk, output.bd, materialNo);
    let result = onlyTestVariables(getAfters.hk, secondTest.output);
    expect(result.getHK).to.deep.equal(result.getOutput);
  });
  // it("start with two, end with two", function () {
  //   let materialNo = "TAC11173800";
  //   let output = markBefores(getHK, getBD, materialNo);
  //   // output.hk
  //   let filtered = _.filter(output.hk, { materialNo: materialNo });
  //   let getAfters = markAfters(output.hk, output.bd, materialNo);
  //   let result = onlyTestVariables(getAfters.hk, getOutput);
  //   expect(result.getHK).to.deep.equal(result.getOutput);
  // });
});
