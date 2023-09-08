const reader = require("xlsx");
const _ = require("lodash");
const { HK_FILE, BD_FILE, days } = require("./VARIABLES.js");
const {
  readFile,
  createFile,
  reassignKeys,
} = require("./javascript/helper.js");

const hkFile = reader.readFile(`./data/${HK_FILE}`);
const bdFile = reader.readFile(`./data/${BD_FILE}`);

console.log(readFile(hkFile));

let hkData = readFile(hkFile);
let bdData = readFile(bdFile);
console.log(reassignKeys(hkData));
// console.log(reassignKeys(hkData));

// console.log(hkData);
// console.log(bdData);

// let hkResult = _.map(hkData, (item) => _.pick(item, "a"));
// let bdResult = _.map(bdData, (item) => _.pick(item, "a"));
