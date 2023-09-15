const {
  DAYS_TO_ADD,
  OUTPUT_FILE,
  WEIGHT_TO_ADD,
  CURRENT_DATE,
  CURRENT_DATE_2,
  WEIRD_DATE_OF_ISSUE,
  WEIRD_ASSIGN_MAX_DATE,
  HK_ITEM_NUMBER,
  HK_ITEM_DESCRIPTION,
  HK_QTY,
  HK_ACORSC,
  HK_REMARKS,
  BD_DATE_OF_ISSUE,
  BD_MATERIAL_NUMBER,
  BD_OWED_QUANTITY,
  BD_ALLOCATE_IN_TRANSITE_WAREHOUSE,
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
    if (test) {
      let getOutput = this.reassignKeys(this.answerFile, "hk", CURRENT_DATE_2);
      getOutput = this.keepKeysTesting(getOutput, "hk");
      let getHK = this.reassignKeys(this.hkFile, "hk", CURRENT_DATE_2);
      getHK = this.keepKeysTesting(getHK, "hk");
      let getBD = this.reassignKeys(this.bdFile, "bd", CURRENT_DATE_2);
      getBD = this.keepKeysTesting(getBD, "bd");
      return { getOutput, getHK, getBD };
    } else {
      let getOutput = this.reassignKeys(this.answerFile, "hk", CURRENT_DATE);
      let getHK = this.reassignKeys(this.hkFile, "hk", CURRENT_DATE);
      let getBD = this.reassignKeys(this.bdFile, "bd", CURRENT_DATE);
      return { getOutput, getHK, getBD };
    }
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
  convertToDate(stringOrNum, weird_date) {
    let returnDate;
    if (typeof stringOrNum === "string") {
      if (!weird_date) {
        returnDate = new Date(stringOrNum.trim());
        // let resultDate = new Date(returnDate.getTime());
        // resultDate.setDate(returnDate.getDate() + 1);
        // return resultDate;
        return returnDate; 
      } else {
        returnDate = new Date(stringOrNum.trim());
        let resultDate = new Date(returnDate.getTime());
        resultDate.setDate(returnDate.getDate() + 1);
        return returnDate;
      }
    } else if (typeof stringOrNum === "number") {
      stringOrNum = parseInt(stringOrNum);
      if (!weird_date) {
        const excelEpoch = new Date(1899, 11, 31);
        const excelEpochAsUnixTimestamp = excelEpoch.getTime();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        returnDate = new Date(
          excelEpochAsUnixTimestamp + stringOrNum * millisecondsPerDay
        );
        return returnDate; 
        // let resultDate = new Date(returnDate.getTime());
        // resultDate.setDate(returnDate.getDate() + 1);
        // return returnDate;
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
  reassignKeys(data, type, date) {
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
        this.getLetterPosition(BD_DATE_OF_ISSUE),
        this.getLetterPosition(BD_MATERIAL_NUMBER),
        this.getLetterPosition(BD_OWED_QUANTITY),
        this.getLetterPosition(BD_ALLOCATE_IN_TRANSITE_WAREHOUSE),
        this.getLetterPosition(BD_ASSIGN_MAX_IN_TRANSIT_DATE),
        this.getLetterPosition(BD_MATERIAL_SHORTAGE_AFTER_INVENTORY_ALLOCATION),
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
        let keyIndex = oldKeys.indexOf(index);
        if (keyIndex > -1) {
          if (type == "bd") {
            if (newKeys[keyIndex] === "dateOfIssue") {
              let dateOfIssue = this.convertToDate(obj[key], WEIRD_DATE_OF_ISSUE);
              newObj["dateOfIssue"] = dateOfIssue;
              let beforeOrAfter = this.getNextWedAndDays(date);
              if (beforeOrAfter > dateOfIssue) {
                newObj["before"] = true;
              } else {
                newObj["before"] = false;
              }
              newObj["added"] = false;  
            } 
            if (newKeys[keyIndex] === "assignMaxInTransit") {
               let assignMax = this.convertToDate(obj[key], WEIRD_ASSIGN_MAX_DATE);
              newObj["assignMaxInTransit"] = assignMax;
            } 
            if (newKeys[keyIndex] === "owedQty") {
            let addWeight = obj[key] + WEIGHT_TO_ADD;
              newObj["owedQty"] = addWeight;
            }
            if (newKeys[keyIndex]=== "materialNo" || newKeys[keyIndex]=== "allocateInTransit" || newKeys[keyIndex]=== "materialShortageAfterInventory") {
              newObj[newKeys[keyIndex]] = obj[key];
            }
          } else if (type == "hk") {
           if (newKeys[keyIndex] === "description") {
              let kg = this.getWeight(obj[key]);
              newObj["kg"] = kg;
              newObj["added"] = false;
            } else {
              newObj[newKeys[keyIndex]] = obj[key];
            }
          } 
        } 
        /*else {
          // Otherwise, use the old key
          newObj[key] = obj[key];
        }*/
      });
      

      return newObj;
    });
    result = result.map((obj) => {
      if (obj.materialNo && typeof obj.materialNo === "string") {
        return { ...obj, materialNo: obj.materialNo.trim() };
      } else {
        return obj;
      }
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
      keepKeys = ["materialNo", "description", "qty", "airOrShip", "remarks", "kg"];
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
