const _ = require("lodash");
const { ReadAndWrite } = require("../javascript/readAndWrite.js");
const {
  convertToDate,
  excelDateToJSDate,
  getNextWedAndDays,
  isSecondDateLater,
} = require("../javascript/dates.js");
const { getFiltered } = require("../javascript/utility.js");
const {
  FORMAT_DATE_OF_ISSUE,
  FORMAT_ASSIGN_MAX_DATE,
} = require("../javascript/variables.js");
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
    readAndWrite = new ReadAndWrite(
      "./testData/hkor_test.xlsx",
      "./testData/bdor_test.xlsx",
      "./testData/output_test.xlsx"
    );
    let result = readAndWrite.init();
    getOutput = readAndWrite.keepKeysTesting(result.getOutput, "hk");
    getHK = readAndWrite.keepKeysTesting(result.getHK, "hk");
    getBD = readAndWrite.keepKeysTesting(result.getBD, "bd");
  });

  it("should correctly convert string to date", function () {
    let tac70840 = getFiltered(getBD, "70840");
    let first = tac70840[0].dateOfIssue;
    let expected = "2023-09-13T00:00:00.000+08:00";
    expect(first).to.equal(expected);
    let tac79670 = getFiltered(getBD, "79670");
    let max = tac79670[0].assignMaxInTransit;
    let expected2 = "2023-09-21T00:00:00.000+08:00";
    expect(max).to.equal(expected2);
  });
  it("should correctly format if the format changes", function () {
    let tac12070 = getFiltered(getBD, "79670");
    let fourth = tac12070[0].assignMaxInTransit;
    let expected = "2023-09-21T00:00:00.000+08:00";
    expect(fourth).to.equal(expected);
  });
  it("should get the next wednesday + 35 days correctly", function () {
    let output = getNextWedAndDays(new Date("2023-09-16"));
    let expected = "2023-10-25T08:00:00.000+08:00";
    expect(output).to.equal(expected);
    let output2 = getNextWedAndDays(new Date("2023-09-10"));
    expect(output2).to.equal("2023-10-18T08:00:00.000+08:00");
  });
  it("should compare two days and return true if latter date is later", function () {
    let tac79670 = getFiltered(getBD, "79670");
    let firstDate = tac79670[0].dateOfIssue;
    let secondDate = tac79670[0].assignMaxInTransit;
    let output = isSecondDateLater(firstDate, secondDate);
    expect(output).to.equal(true);
  });
  it("should return true if assign max is invalid", function () {
    let tac4990 = getFiltered(getBD, "4990");
    let firstDate = tac4990[0].dateOfIssue;
    let secondDate = tac4990[0].assignMaxInTransit;
    let output = isSecondDateLater(firstDate, secondDate);
    expect(output).to.equal(false);
  });

  it("should return true if 35 days and after lands right on that date", function () {
    let tac70840 = getFiltered(getBD, "81440");
    let dateOfIssue = tac70840[1].dateOfIssue;
    let endOct = getNextWedAndDays(new Date("2023-09-15"));
    let output = isSecondDateLater(dateOfIssue, endOct);
    expect(output).to.equal(false);
  });
});
