const { DateTime, Duration } = require("luxon");
const {
  convertToDate,
  excelDateToJSDate,
  getNextWedAndDays,
  isSecondDateLater,
} = require("./dates.js");
const {
  DAYS_TO_ADD,
  OUTPUT_FILE,
  WEIGHT_TO_ADD,
  CURRENT_DATE,
  CURRENT_DATE_2,
  FORMAT_DATE_OF_ISSUE,
  FORMAT_ASSIGN_MAX_DATE,
  HK_ITEM_NUMBER,
  HK_ITEM_DESCRIPTION,
  HK_QTY,
  HK_ACORSC,
  HK_REMARKS,
  BD_DATE_OF_ISSUE,
  BD_MATERIAL_NUMBER,
  BD_OWED_QUANTITY,
  BD_ASSIGN_MAX_IN_TRANSIT_DATE,
  BD_MATERIAL_SHORTAGE_AFTER_INVENTORY_ALLOCATION,
} = require("./variables.js");
const _ = require("lodash");
const reader = require("xlsx");
class ReadAndWrite {
  constructor(HK_FILE, BD_FILE, ANSWERS_FILE) {
    this.hkFile = this.readFile(HK_FILE);
    this.bdFile = this.readFile(BD_FILE);
    this.answerFile = this.readFile(ANSWERS_FILE);
  }
  init(test) {
    let getOutput = this.reassignKeys(
      this.answerFile,
      "hk",
      new Date("2023-09-15")
    );
    getOutput = this.keepKeysTesting(getOutput, "hk");
    let getHK = this.reassignKeys(this.hkFile, "hk", new Date("2023-09-15"));
    getHK = this.keepKeysTesting(getHK, "hk");
    let getBD = this.reassignKeys(this.bdFile, "bd", new Date("2023-09-15"));
    getBD = this.keepKeysTesting(getBD, "bd");
    return { getOutput, getHK, getBD };
  }
  readFile(file) {
    let returnData = [];
    const data = reader.readFile(file);
    let sheet = data.SheetNames[0];
    const temp = reader.utils.sheet_to_json(data.Sheets[sheet], {
      defval: "",
      raw: true,
    });
    temp.forEach((res) => {
      returnData.push(res);
    });
    return returnData;
  }
  getHK() {
    return this.hkFile;
  }
  getBD() {
    return this.bdFile;
  }
  getOutput() {
    return this.answerFile;
  }
  createFile(data, outputFile, optionalOutput) {
    let originalKeys;
    if (optionalOutput) {
      let getHK = _.map(data, (item) =>
        _.pick(item, [
          "materialNo",
          "description",
          "qty",
          "airOrShip",
          "remarks",
        ])
      );
      let getOutput = _.map(optionalOutput, (item) =>
        _.pick(item, [
          "materialNo",
          "description",
          "qty",
          "airOrShip",
          "remarks",
        ])
      );

      let result = getHK.map((obj1) => {
        let existsInArrayTwo = _.some(getOutput, (obj2) =>
          _.isMatch(obj2, _.pick(obj1, ["materialNo", "qty", "airOrShip"]))
        );
        return { ...obj1, correct: existsInArrayTwo };
      });
      originalKeys = this.revertKeys(result);
    } else {
      originalKeys = this.revertKeys(data);
    }
    let workbook = reader.utils.book_new();
    // Create a new worksheet from the data.
    let wscols = [
      { wch: 15 },
      { wch: 50 },
      { wch: 10 },
      { wch: 15 },
      { wch: 25 },
    ];
    let worksheet = reader.utils.json_to_sheet(originalKeys);
    worksheet["!cols"] = wscols;
    // Add the worksheet to the workbook.
    reader.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Write the workbook to a new Excel file.
    reader.writeFile(workbook, `./data/${outputFile}`, {
      bookType: "xlsx",
      type: "binary",
    });
  }
  getWeight(descriptionString) {
    const match = descriptionString.match(/(\d+(\.\d+)?)\D*$/);
    return match ? parseFloat(match[1]) : null;
  }
  getLetterPosition(letter) {
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
  reassignKeys(data, type, date, test) {
    let oldKeys;
    let newKeys;
    if (type == "hk") {
      oldKeys = [
        this.getLetterPosition(HK_ITEM_NUMBER),
        this.getLetterPosition(HK_ITEM_DESCRIPTION),
        this.getLetterPosition(HK_QTY),
        this.getLetterPosition(HK_ACORSC),
        this.getLetterPosition(HK_REMARKS),
      ];
      newKeys = ["materialNo", "description", "qty", "airOrShip", "remarks"];
    } else {
      oldKeys = [
        this.getLetterPosition(BD_MATERIAL_NUMBER),
        this.getLetterPosition(BD_OWED_QUANTITY),
        this.getLetterPosition(BD_ASSIGN_MAX_IN_TRANSIT_DATE),
        this.getLetterPosition(BD_MATERIAL_SHORTAGE_AFTER_INVENTORY_ALLOCATION),

        this.getLetterPosition(BD_DATE_OF_ISSUE),
      ];
      newKeys = [
        "materialNo",
        "owedQty",
        "assignMaxInTransit",
        "materialShortageAfterInventory",

        "dateOfIssue",
      ];
    }
    let result = data.map((obj) => {
      let newObj = {};
      let keys = Object.keys(obj);
      keys.forEach((key, index) => {
        let keyIndex = oldKeys.indexOf(index);
        // console.log("key", key);
        if (keyIndex > -1) {
          if (type == "bd") {
            // console.log
            if (newKeys[keyIndex] === "materialNo") {
              let trimmed = obj[key].trim();
              newObj[newKeys[keyIndex]] = trimmed;
            }
            if (newKeys[keyIndex] === "materialShortageAfterInventory") {
              newObj[newKeys[keyIndex]] = obj[key];
            }
            if (newKeys[keyIndex] === "dateOfIssue") {
              let dateOfIssue = convertToDate(
                obj[key],
                FORMAT_DATE_OF_ISSUE,
                test
              );
              newObj["dateOfIssue"] = dateOfIssue;
              let nextWedAnd35 = getNextWedAndDays(date);
              let isAfter = isSecondDateLater(nextWedAnd35, dateOfIssue);
              if (isAfter) {
                newObj["before"] = false;
              } else {
                newObj["before"] = true;
              }
              newObj["added"] = false;
            }
            if (newKeys[keyIndex] === "assignMaxInTransit") {
              let assignMax = convertToDate(
                obj[key],
                FORMAT_ASSIGN_MAX_DATE,
                test
              );
              newObj["assignMaxInTransit"] = assignMax;
            }
            if (newKeys[keyIndex] === "owedQty") {
              let addWeight = obj[key] + WEIGHT_TO_ADD;
              newObj["owedQty"] = addWeight;
            }
          } else if (type == "hk") {
            if (newKeys[keyIndex] === "materialNo") {
              let trimmed = obj[key].trim();
              newObj[newKeys[keyIndex]] = trimmed;
            }
            if (
              newKeys[keyIndex] === "remarks" ||
              newKeys[keyIndex] === "qty" ||
              newKeys[keyIndex] === "airOrShip"
            ) {
              newObj[newKeys[keyIndex]] = obj[key];
            }
            if (newKeys[keyIndex] === "description") {
              newObj[newKeys[keyIndex]] = obj[key];
              let kg = this.getWeight(obj[key]);
              newObj["kg"] = kg;
              newObj["added"] = false;
            }
          }
        }
      });

      return newObj;
    });
    return result;
  }
  trim(value) {
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      return value.trim();
    }
  }
  revertKeys(array) {
    let newArray = array.map((obj) => {
      let newObj = { ...obj }; // create a copy of the object
      newObj["Item Number"] = newObj.materialNo;
      newObj["Item Description"] = newObj.description;
      newObj["Qty"] = newObj.qty;
      newObj["By air or ship"] = newObj.airOrShip;
      newObj["Remarks"] = newObj.remarks;
      delete newObj.materialNo;
      delete newObj.description;
      delete newObj.qty;
      // TO DO: do you need this?
      delete newObj.added;
      delete newObj.kg;
      delete newObj.airOrShip;
      delete newObj.remarks;
      return newObj;
    });
    return newArray;
  }
  keepKeysTesting(array, type) {
    let keepKeys;
    if (type == "bd") {
      keepKeys = [
        "dateOfIssue",
        "materialNo",
        "owedQty",
        "allocateInTransit",
        "assignMaxInTransit",
        "materialShortageAfterInventory",
        "before",
      ];
    } else {
      keepKeys = [
        "materialNo",
        "description",
        "qty",
        "airOrShip",
        "remarks",
        "kg",
      ];
    }

    array = array.map((obj) => {
      Object.keys(obj).forEach((key) => {
        if (!keepKeys.includes(key)) {
          delete obj[key];
        }
      });
      return obj;
    });
    return array;
  }
}

module.exports = { ReadAndWrite };
