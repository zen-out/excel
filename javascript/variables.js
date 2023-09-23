const HK_FILE = "./data/hkor.xlsx";
const BD_FILE = "./data/bdor.xlsx";
const ANSWERS_FILE = "./data/hkor.outputwithanswers.xlsx";
const OUTPUT_FILE = "./data/output.xlsx";
const DAYS_TO_ADD = 35;
const WEIGHT_TO_ADD = 0;
const CURRENT_DATE = new Date("2023-09-15");
const FORMAT_DATE_OF_ISSUE = "MM/dd/yy";
const FORMAT_ASSIGN_MAX_DATE = "MM/dd/yy";
// 1 is Monday and 7 is Sunday
// If it's 0, it means 35 days from the CURRENT_DATE
const NEXT_SHIPPING = 0;
const HK_ITEM_NUMBER = "D";
const HK_ITEM_DESCRIPTION = "F";
const HK_QTY = "H";
const HK_ACORSC = "K";
const HK_REMARKS = "O";
const BD_DATE_OF_ISSUE = "Y";
const BD_MATERIAL_NUMBER = "AA";
const BD_OWED_QUANTITY = "AS";
const BD_ASSIGN_MAX_IN_TRANSIT_DATE = "BC";
const BD_MATERIAL_SHORTAGE_AFTER_INVENTORY_ALLOCATION = "BD";
module.exports = {
  HK_FILE,
  BD_FILE,
  ANSWERS_FILE,
  OUTPUT_FILE,
  DAYS_TO_ADD,
  WEIGHT_TO_ADD,
  NEXT_SHIPPING,
  CURRENT_DATE,
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
};
