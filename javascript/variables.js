const HK_FILE = "./data/successful/hk_input_1.xlsx";
const BD_FILE = "./data/successful/bd_input_1_notweirddates.xlsx";
const ANSWERS_FILE = "./data/successful/hk_output_1.xlsx";
const DOUBLE_CHECK_HK = "./data/hkor.xlsx";
const DOUBLE_CHECK_BD = "./data/bdor.xlsx";
const DOUBLE_CHECK_OUTPUT = "./data/hkor.outputwithanswers.xlsx";
const TEMPLATE_FILE = "./data/template.xlsx";
const OUTPUT_FILE = "./data/output.xlsx";
const DAYS_TO_ADD = 35;
const WEIGHT_TO_ADD = 0;
const CURRENT_DATE = new Date("2023-09-10");
const CURRENT_DATE_2 = new Date("2023-09-14");
const WEIRD_DATE_OF_ISSUE = false;
const WEIRD_ASSIGN_MAX_DATE = false;
const HK_ITEM_NUMBER = "A";
const HK_ITEM_DESCRIPTION = "B";
const HK_QTY = "C";
const HK_ACORSC = "D";
const HK_REMARKS = "E";
const BD_DATE_OF_ISSUE = "A";
const BD_MATERIAL_NUMBER = "B";
const BD_OWED_QUANTITY = "C";
const BD_ALLOCATE_IN_TRANSITE_WAREHOUSE = "D";
const BD_ASSIGN_MAX_IN_TRANSIT_DATE = "E";
const BD_MATERIAL_SHORTAGE_AFTER_INVENTORY_ALLOCATION = "F";
// const HK_ITEM_NUMBER = "D";
// const HK_ITEM_DESCRIPTION = "G";
// const HK_QTY = "I";
// const HK_ACORSC = "M";
// const HK_REMARKS = "Q";
// const BD_DATE_OF_ISSUE = "W";
// const BD_MATERIAL_NUMBER = "Y";
// const BD_OWED_QUANTITY = "AQ";
// const BD_ALLOCATE_IN_TRANSITE_WAREHOUSE = "AX";
// const BD_ASSIGN_MAX_IN_TRANSIT_DATE = "BA";
// const BD_MATERIAL_SHORTAGE_AFTER_INVENTORY_ALLOCATION = "BB";
module.exports = {
  HK_FILE,
  BD_FILE,
  WEIRD_ASSIGN_MAX_DATE,
  ANSWERS_FILE,
  OUTPUT_FILE,
  DAYS_TO_ADD,
  WEIGHT_TO_ADD,
  TEMPLATE_FILE,
  CURRENT_DATE,
  DOUBLE_CHECK_HK,
  DOUBLE_CHECK_BD,
  DOUBLE_CHECK_OUTPUT,
  CURRENT_DATE_2,
  WEIRD_DATE_OF_ISSUE,
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
};
