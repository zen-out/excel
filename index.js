console.debug("");
console.debug("********************* RUN *********************");
console.debug("");
const _ = require("lodash");
const { beforeTest, runTest, afterTest } = require("./javascript/tests.js");
const {
  getBeforeQty,
  getAfterQty,
  getAfterQtyPartTwo,
  markBDAdded,
} = require("./javascript/functions.js");
const { ReadAndWrite } = require("./javascript/readAndWrite.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
const {
  HK_FILE,
  BD_FILE,
  ANSWERS_FILE,
  DOUBLE_CHECK_HK,
  DOUBLE_CHECK_BD,
  DOUBLE_CHECK_OUTPUT,
} = require("./javascript/variables.js");

let materialNo = "TAC11181200";
// do it blind
// function getBeforeTest() {
//   let getFiles = new ReadAndWrite(HK_FILE, BD_FILE, ANSWERS_FILE);
//   let { getOutput, getHK, getBD } = getFiles.init();
//   // markAfters(getHK, getBD);
//   beforeTest(getHK);
// }
// getBeforeTest();

function integerToDate(stringOrNum) {
  let returnDate;
  const excelEpoch = new Date(1899, 11, 31);
  const excelEpochAsUnixTimestamp = excelEpoch.getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  returnDate = new Date(
    excelEpochAsUnixTimestamp + stringOrNum * millisecondsPerDay
  );
  return returnDate;
}
function swapMonthDay(date) {
  let newDate = new Date(date);
  let month = newDate.getUTCMonth() + 1; // getMonth() returns month index starting from 0
  let day = newDate.getUTCDate();
  let year = newDate.getUTCFullYear();
  let hours = newDate.getUTCHours();
  let minutes = newDate.getUTCMinutes();
  let seconds = newDate.getUTCSeconds();

  // Create a new Date object with swapped month and day
  // Note: the month argument for the Date constructor is 0-based (0 = January)
  let swappedDate = new Date(
    Date.UTC(year, day - 1, month, hours, minutes, seconds)
  );

  return swappedDate;
}
function dates() {
  let getFiles = new ReadAndWrite(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT
  );
  let bd = getFiles.getBD();
  // let getBD = getFiles.reassignKeys(bd);
  let filtered = _.filter(bd, (obj) =>
    _.includes(obj["Material number"], "TAC00000430")
  );
  console.log(filtered[0]);
  let ogDate = filtered[0]["Date of issue"];
  // console.log(ogDate);
  let getDate = integerToDate(ogDate);
  console.log(getDate);
  let getDate2 = getFiles.convertToDate(ogDate);
  console.log(getDate2);
  let swap = swapMonthDay(getDate2);
  console.log("should be oct 1", swap);
}
// dates();

function getAfterTest() {
  let getFiles = new ReadAndWrite(HK_FILE, BD_FILE, ANSWERS_FILE);
  let { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, "test");
  // let filteredHK = _.filter(hk, { added: false });
  // let filteredBD = _.filter(bd, { added: false });
  // console.log(filteredBD);
  // console.log(filteredHK);
  let getAfters = markAfters(hk, bd);
  // console.log(getAfters.hk);

  // let bd = cleanBD(getBefore.hk, getBefore.bd);

  // let filteredBD = _.filter(bd, { added: false });
  // console.log(filtered);
  // console.log(filteredBD);
}
// getAfterTest();
// let reassignedHK2 = reassignKeys(hkFile, "hk");

function additionalLengthTest(bdAfter) {
  let getFiles = new ReadAndWrite(HK_FILE, BD_FILE, ANSWERS_FILE);
  const { getOutput, getHK, getBD } = getFiles.init();
  let beforeBD = _.filter(getBD, { before: true, added: false });
  // console.log(bdBefore, "bd");
  let afterBD = _.filter(bdAfter, { before: true, added: true });
  if (beforeBD.length !== afterBD.length) {
    // console.log(beforeBD[0]);
    let difference = _.differenceWith(beforeBD, afterBD, _.isEqual);
    console.log("*** FAILED length test bd ***");
    // console.log(difference);
    // console.log("ORIGINAL LENGTH", beforeBD.length);
    // console.log("AFTER LENGTH", afterBD.length);
  } else {
    console.log("*** bd length test passed ***");
    console.log("");
  }
}
function alwaysRunThisTest() {
  let getFiles = new ReadAndWrite(
    HK_FILE,
    "./data/bd_dates.xlsx",
    ANSWERS_FILE
  );
  const { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd);
  // console.log(getAfters.hk);

  runTest(getOutput, getAfters.hk);

  // additionalLengthTest(bd);
}
alwaysRunThisTest();

function doubleCheckTest() {
  let getFiles = new ReadAndWrite(
    DOUBLE_CHECK_HK,
    DOUBLE_CHECK_BD,
    DOUBLE_CHECK_OUTPUT
  );
  const { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd);
  // console.log(getAfters.hk);

  runTest(getOutput, getAfters.hk);
}

// doubleCheckTest();
