const {
  DAYS_TO_ADD,
  OUTPUT_FILE,
  WEIGHT_TO_ADD,
  CURRENT_DATE,
  WEIRD_DATES,
} = require("./variables.js");
const _ = require("lodash");
const reader = require("xlsx");
class ReadAndWrite {
  constructor(HK_FILE, BD_FILE, ANSWERS_FILE) {
    this.hkFile = this.readFile(HK_FILE);
    this.bdFile = this.readFile(BD_FILE);
    this.answerFile = this.readFile(ANSWERS_FILE);
  }
  init() {
    let getOutput = this.reassignKeys(this.answerFile, "hk");
    let getHK = this.reassignKeys(this.hkFile, "hk");
    let getBD = this.reassignKeys(this.bdFile, "bd");
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
  createFile(data) {
    let originalKeys = revertKeys(data);
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
    reader.writeFile(workbook, `./data/${OUTPUT_FILE}`, {
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
  convertToDate2(stringOrNum) {
    let returnDate;
    if (typeof stringOrNum === "string") {
      returnDate = new Date(stringOrNum.trim());
      let resultDate = new Date(returnDate.getTime());
      resultDate.setDate(returnDate.getDate() + 1);
      return resultDate;
    } else if (typeof stringOrNum === "number") {
      const excelEpoch = new Date(1899, 11, 31);
      const excelEpochAsUnixTimestamp = excelEpoch.getTime();
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      returnDate = new Date(
        excelEpochAsUnixTimestamp + stringOrNum * millisecondsPerDay
      );
      let resultDate = new Date(returnDate.getTime());
      resultDate.setDate(returnDate.getDate() + 1);
      return resultDate;
    } else {
      returnDate = null;
      return returnDate;
    }
  }
  convertToDate(stringOrNum) {
    let returnDate;
    if (typeof stringOrNum === "string") {
      returnDate = new Date(stringOrNum.trim());
      let resultDate = new Date(returnDate.getTime());
      resultDate.setDate(returnDate.getDate() + 1);
      return resultDate;
    } else if (typeof stringOrNum === "number") {
      if (!WEIRD_DATES) {
        const excelEpoch = new Date(1899, 11, 31);
        const excelEpochAsUnixTimestamp = excelEpoch.getTime();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        returnDate = new Date(
          excelEpochAsUnixTimestamp + stringOrNum * millisecondsPerDay
        );
        let resultDate = new Date(returnDate.getTime());
        resultDate.setDate(returnDate.getDate() + 1);
        return resultDate;
      } else {
        const excelEpoch = new Date(1899, 11, 31);
        const excelEpochAsUnixTimestamp = excelEpoch.getTime();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        returnDate = new Date(
          excelEpochAsUnixTimestamp + stringOrNum * millisecondsPerDay
        );
        // let newDate = new Date(returnDate);
        let month = returnDate.getUTCMonth() + 1; // getMonth() returns month index starting from 0
        let day = returnDate.getUTCDate();
        let year = returnDate.getUTCFullYear();
        let hours = returnDate.getUTCHours();
        let minutes = returnDate.getUTCMinutes();
        let seconds = returnDate.getUTCSeconds();
        let swappedDate = new Date(
          Date.UTC(year, day - 1, month, hours, minutes, seconds)
        );
        return swappedDate;
      }
    } else {
      returnDate = null;
      return returnDate;
    }
  }
  getNextWedAndDays(currDate) {
    let resultDate = new Date(currDate.getTime());
    resultDate.setDate(
      currDate.getDate() + ((3 - 1 - currDate.getDay() + 7) % 7) + 1
    );
    resultDate.setDate(resultDate.getDate() + DAYS_TO_ADD);
    return resultDate;
  }
  reassignKeys(data, type) {
    let oldKeys;
    let newKeys;
    if (type == "hk") {
      oldKeys = [
        this.getLetterPosition("A"),
        this.getLetterPosition("B"),
        this.getLetterPosition("C"),
        this.getLetterPosition("D"),
        this.getLetterPosition("E"),
      ];
      newKeys = ["materialNo", "description", "qty", "airOrShip", "remarks"];
    } else {
      oldKeys = [
        this.getLetterPosition("A"),
        this.getLetterPosition("B"),
        this.getLetterPosition("C"),
        this.getLetterPosition("D"),
        this.getLetterPosition("E"),
        this.getLetterPosition("F"),
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
          let kg = this.getWeight(obj[key]);
          newObj["kg"] = kg;
          // TODO: Do you need this?
          newObj["added"] = false;
        }

        if (key.toLowerCase().includes("date of issue")) {
          let dateOfIssue = this.convertToDate(obj[key]);
          obj[key] = dateOfIssue;
          let beforeOrAfter = this.getNextWedAndDays(CURRENT_DATE);
          if (beforeOrAfter > dateOfIssue) {
            newObj["before"] = true;
          } else {
            newObj["before"] = false;
          }
          newObj["added"] = false;
        }
        if (key.toLowerCase().includes("assign maximum in transit")) {
          let assignMax = this.convertToDate(obj[key]);
          if (isNaN(assignMax)) {
            obj[key] = " ";
          } else {
            obj[key] = assignMax;
          }
          obj[key] = assignMax;
        }

        if (key.toLowerCase().includes("owed quantity")) {
          let addWeight = obj[key] + WEIGHT_TO_ADD;
          obj[key] = addWeight;
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
}

module.exports = { ReadAndWrite };
