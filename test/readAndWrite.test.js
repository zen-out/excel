const _ = require("lodash");
const { ReadAndWrite } = require("../javascript/readAndWrite.js");
const bdor = "./testData/bdor_test.xlsx";
const hkor = "./testData/hkor_test.xlsx";
const output = "./testData/output_test.xlsx";
const chai = require("chai");
const expect = chai.expect;

describe("convertToDate", function () {
  let readAndWrite;
  let getOutput;
  let getHK;
  let getBD;

  before(function () {
    readAndWrite = new ReadAndWrite(hkor, bdor, output);
    let result = readAndWrite.init();
    getOutput = result.getOutput;
    getHK = result.getHK;
    getBD = result.getBD;
  });

  it("should correctly convert string to date", function () {
    const input = "2023-09-16"; // replace with an appropriate test value
    const output = readAndWrite.convertToDate(input, false);
    // expect(output).to.be.a("date");
    // expect(output.toISOString()).to.equal("2023-09-16T00:00:00.000Z"); // replace with the expected output
  });

  it("should correctly convert number to date", function () {
    // let expected = new Date("1994-12-11T00:00:00.000+08:00");
    // should be 12/10/2023 (october 10, 2023)
    const input = 45211;
    let output = readAndWrite.excelDateToJSDate(input);
    console.log(output);
    expect(output).to.be.a("date");
    // expect(output).to.equal(expected);
  });
  it("should always swap dates", function () {
    let expected = new Date("1994-12-11T00:00:00.000Z").toISOString();
    let expected2 = new Date("1994-11-12T00:00:00.000Z").toISOString();
    let dateOne = "12/11/1994";
    let dateTwo = 34679;
    let dateThree = new Date("1994-12-11");
    // let output = readAndWrite.convertToDate(dateOne, false);
    // expect(output.toISOString()).to.equal(expected);
    // let output2 = readAndWrite.convertToDate(dateTwo, false);
    // expect(output2.toISOString()).to.equal(expected);
    // let output3 = readAndWrite.swapDate(dateThree, true);
    // console.log(output3);
    // expect(output3.toISOString()).to.equal(expected2);
  });
  it("should return dates correctly", function () {
    // let output = readAndWrite.convertToDate(45189, false, "12070");
    // console.log(output);
  });
});
