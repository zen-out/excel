const _ = require("lodash");
const { HK_FILE, BD_FILE, days } = require("./VARIABLES.js");
const {
  readFile,
  createFile,
  reassignKeys,
} = require("./javascript/helper.js");
const { eachBD } = require("./javascript/methods.js");
// Will assign to airship

const hkFile = readFile(`./data/${HK_FILE}`);
const bdFile = readFile(`./data/${BD_FILE}`);
// console.log(hkFile);

let reassignedHK = reassignKeys(hkFile, "hk");
// console.log(reassignedHK);
let reassignedBD = reassignKeys(bdFile, "bd");
// console.log(reassignedBD);

function testOne() {
  let filterHK = _.filter(reassignedHK, { materialNo: materialNo });
  let filterBD = _.filter(reassignedBD, { materialNo: materialNo });
  let getItem = eachItem(filterHK, filterBD, "TAC11179670");
}
// testOne();
