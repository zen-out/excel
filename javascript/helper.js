const _ = require("lodash");
const reader = require("xlsx");
const { days, OUTPUT_FILE } = require("../VARIABLES.JS");
function readFile(file) {
  let data = [];
  const sheets = file.SheetNames;
  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]], {
      defval: "",
    });
    temp.forEach((res) => {
      data.push(res);
    });
  }
  return data;
}

function createFile(data) {
  // Create a new workbook object.
  let workbook = reader.utils.book_new();
  // Create a new worksheet from the data.
  let worksheet = reader.utils.json_to_sheet(data);
  // Add the worksheet to the workbook.
  reader.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // Write the workbook to a new Excel file.
  reader.writeFile(workbook, OUTPUT_FILE);
}

function getNextWednesday(date) {
  let resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + ((3 - 1 - date.getDay() + 7) % 7) + 1);
  return resultDate;
}
function getWeight(descriptionString) {
  const match = descriptionString.match(/(\d+(\.\d+)?)\D*$/);
  return match ? parseFloat(match[1]) : null;
}
function getLetterPosition(letter) {
  const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = 0;

  for (let i = 0; i < letter.length; i++) {
    const position = base.indexOf(letter[i].toUpperCase());

    if (position === -1) {
      throw new Error(
        `Invalid input: ${letter}. Input must be a single English alphabet letter.`
      );
    }

    result = result * 26 + position + 1; // Corrected to handle multiple letters
  }
  let value = result - 1;
  return value;
}
function reassignKeys(data) {
  const oldKeys = [
    getLetterPosition("A"),
    getLetterPosition("B"),
    getLetterPosition("C"),
    getLetterPosition("D"),
    getLetterPosition("E"),
  ];
  const newKeys = ["item", "description", "qty", "airOrShip", "remarks"];

  let result = data.map((obj) => {
    let newObj = {};
    let keys = Object.keys(obj);

    keys.forEach((key, index) => {
      let keyIndex = oldKeys.indexOf(index);
      if (keyIndex > -1) {
        // If it's one of the keys to be changed, use the new key
        newObj[newKeys[keyIndex]] = obj[key];
      } else {
        // Otherwise, use the old key
        newObj[key] = obj[key];
      }
    });

    return newObj;
  });
  console.log(result);
  return result;
}

module.exports = {
  reassignKeys,
  readFile,
  createFile,
  getNextWednesday,
  getWeight,
};
