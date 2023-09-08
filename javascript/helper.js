const _ = require("lodash");
const reader = require("xlsx");
const { DAYS_TO_ADD, OUTPUT_FILE } = require("../VARIABLES.JS");
function readFile(file) {
  let returnData = [];
  const data = reader.readFile(file);
  let sheets = data.SheetNames;
  console.log(data);
  for (let i = 0; i < sheets.length; i++) {
    console.log(sheets[i]);
    const temp = reader.utils.sheet_to_json(data.Sheets[sheets[i]], {
      defval: "",
    });
    temp.forEach((res) => {
      returnData.push(res);
    });
  }
  return returnData;
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

function convertToDate(stringOrNum) {
  let returnDate;
  if (typeof stringOrNum === "string") {
    returnDate = new Date(stringOrNum.trim());
  } else if (typeof stringOrNum === "number") {
    const excelEpoch = new Date(1899, 11, 31);
    const excelEpochAsUnixTimestamp = excelEpoch.getTime();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    returnDate = new Date(
      excelEpochAsUnixTimestamp + stringOrNum * millisecondsPerDay
    );
  } else {
    returnDate = null;
  }
  let resultDate = new Date(returnDate.getTime());
  resultDate.setDate(returnDate.getDate() + 1);
  return resultDate;
}

function getNextWedAndDays(currDate) {
  let resultDate = new Date(currDate.getTime());
  resultDate.setDate(
    currDate.getDate() + ((3 - 1 - currDate.getDay() + 7) % 7) + 1
  );
  resultDate.setDate(resultDate.getDate() + DAYS_TO_ADD);
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
function reassignKeys(data, type) {
  let oldKeys;
  let newKeys;
  if (type == "hk") {
    oldKeys = [
      getLetterPosition("A"),
      getLetterPosition("B"),
      getLetterPosition("C"),
      getLetterPosition("D"),
      getLetterPosition("E"),
    ];
    newKeys = ["materialNo", "description", "qty", "airOrShip", "remarks"];
  } else {
    oldKeys = [
      getLetterPosition("A"),
      getLetterPosition("B"),
      getLetterPosition("C"),
      getLetterPosition("D"),
      getLetterPosition("E"),
      getLetterPosition("F"),
    ];
    newKeys = [
      "dateOfIssue",
      "materialNo",
      "owedQty",
      "allocateInTransit",
      "assignMaxInTransit",
      "materialShortageAfterInventory",
    ];
  }
  let result = data.map((obj) => {
    let newObj = {};
    let keys = Object.keys(obj);

    keys.forEach((key, index) => {
      if (key.toLowerCase().includes("item description")) {
        let kg = getWeight(obj[key]);
        newObj["kg"] = kg;
      }

      if (key.toLowerCase().includes("date of issue")) {
        let dateOfIssue = convertToDate(obj[key]);
        obj[key] = dateOfIssue;
        let beforeOrAfter = getNextWedAndDays(new Date("2023-09-01"));
        if (beforeOrAfter > dateOfIssue) {
          newObj["before"] = true;
        } else {
          newObj["before"] = false;
        }
      }
      if (key.toLowerCase().includes("assign maximum in transit")) {
        let assignMax = convertToDate(obj[key]);
        obj[key] = assignMax;
      }

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
  return result;
}

module.exports = {
  reassignKeys,
  readFile,
  createFile,
  convertToDate,
  getWeight,
};
