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

let materialNo = "TAC11181200";
// do it blind
// function getBeforeTest() {
//   let getFiles = new ReadAndWrite();
//   let { getOutput, getHK, getBD } = getFiles.init();
//   // markAfters(getHK, getBD);
//   beforeTest(getHK);
// }
// getBeforeTest();

function getAfterTest() {
  let getFiles = new ReadAndWrite();
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
getAfterTest();
// let reassignedHK2 = reassignKeys(hkFile, "hk");

function additionalLengthTest(bdAfter) {
  let getFiles = new ReadAndWrite();
  const { getOutput, getHK, getBD } = getFiles.init();
  let beforeBD = _.filter(getBD, { before: true, added: false });
  // console.log(bdBefore, "bd");
  let afterBD = _.filter(bdAfter, { before: true, added: true });
  if (beforeBD.length !== afterBD.length) {
    // console.log(beforeBD[0]);
    let difference = _.differenceWith(beforeBD, afterBD, _.isEqual);
    console.log("*** FAILED length test bd ***");
    console.log(difference);
    console.log("ORIGINAL LENGTH", beforeBD.length);
    console.log("AFTER LENGTH", afterBD.length);
  } else {
    console.log("*** bd length test passed ***");
    console.log("");
  }
}
function alwaysRunThisTest() {
  let getFiles = new ReadAndWrite();
  const { getOutput, getHK, getBD } = getFiles.init();
  let { hk, bd } = markBefores(getHK, getBD, materialNo);
  let getAfters = markAfters(hk, bd);
  // console.log(getAfters.hk);

  runTest(getOutput, getAfters.hk);

  additionalLengthTest(bd);
}
alwaysRunThisTest();
