const _ = require("lodash");
const { HK_FILE, BD_FILE, days } = require("./VARIABLES.js");
const {
  readFile,
  createFile,
  reassignKeys,
  duplicateItemWithSC,
} = require("./javascript/helper.js");
const { markBefores, markAfters } = require("./javascript/methods.js");
// Will assign to airship

const hkFile = readFile(`./data/${HK_FILE}`);
const bdFile = readFile(`./data/${BD_FILE}`);
// console.log(hkFile);

let reassignedHK = reassignKeys(hkFile, "hk");
// console.log(reassignedHK);
let reassignedBD = reassignKeys(bdFile, "bd");
// let getThis = duplicateItemWithSC(reassignedHK, reassignedHK[0]);
// console.log(getThis);
console.log(reassignedBD);
// console.log(reassignedHK);
let materialNo = "TAC11173780";
function testOne() {
  let { hk, bd } = markBefores(reassignedHK, reassignedBD, materialNo);
  // console.log(hk);
  let _test1 = _.filter(hk, { materialNo: materialNo });
  console.log("/n/nTEST/n/n", _test1);
  let get_after = markAfters(hk, bd, materialNo);
  let _test = _.filter(get_after.hk, { materialNo: materialNo });
  console.log("/n/nTEST/n/n", _test);
  let getFinalHK = get_after.hk;
  createFile(getFinalHK);
  // let filterHK = _.filter(reassignedHK, { materialNo: materialNo });
  // console.log(filterHK.length);
  // console.log(filterHK);
  // let getItem = eachItem(filterHK, filterBD, materialNo);
}
testOne();
