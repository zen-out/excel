const reader = require("xlsx");

const hkFile = reader.readFile("./data/hkFile.xlsx");
const bdFile = reader.readFile("./data/bdFile.xlsx");

// reader.utils.book_append_sheet(bdFile, ws, "Sheet3");

// Create a new workbook object.
let workbook = reader.utils.book_new();

// Create a new worksheet from the data.
let worksheet = reader.utils.json_to_sheet(data);

// Add the worksheet to the workbook.
reader.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Write the workbook to a new Excel file.
reader.writeFile(workbook, "NewWorkbook.xlsx");

// Writing to our file
// reader.writeFile(ws, "./data/output.xlsx");
