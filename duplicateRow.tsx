function main(workbook: ExcelScript.Workbook) {
  // insertAndCopyAbove(workbook, 22);
  let row: number = 23;
  const sheet = workbook.getActiveWorksheet();
  sheet.getRange(`A${row}`).getEntireRow().insert(ExcelScript.InsertShiftDirection.down);
  const rangeToCopy = sheet.getRange(`A${row + 1}:N${row + 1}`);  // specify the row to duplicate
  const valuesToCopy = rangeToCopy.getValues();
  let getD = getLetterPosition("D");
  valuesToCopy[0][getD] = "kam";
  console.log(valuesToCopy);
  const newRange = sheet.getRange(`A${row}:N${row}`);  // get the new row
  newRange.setValues(valuesToCopy);
}

function getLetterPosition(letter: string): number {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const position = alphabet.indexOf(letter.toUpperCase());
  if (position === -1) {
    throw new Error(`Invalid input: ${letter}. Input must be a single English alphabet letter.`);
  }
  return position;
}


function insertAndCopyAbove(workbook: ExcelScript.Workbook, row: number) {
  const sheet = workbook.getActiveWorksheet();
  sheet.getRange(`A${row}`).getEntireRow().insert(ExcelScript.InsertShiftDirection.down);
  const rangeToCopy = sheet.getRange(`A${row + 1}:N${row + 1}`);  // specify the row to duplicate
  const valuesToCopy = rangeToCopy.getValues();
  const newRange = sheet.getRange(`A${row}:N${row}`);  // get the new row
  newRange.setValues(valuesToCopy);
}

function copyRow(workbook: ExcelScript.Workbook, rowFrom: number, rowTo: number) {
  const sheet = workbook.getActiveWorksheet();
  const rangeToCopy = sheet.getRange(`A${rowFrom}:N${rowFrom}`);  // specify the row to duplicate
  const valuesToCopy = rangeToCopy.getValues();
  const newRange = sheet.getRange(`A${rowTo}:N${rowTo}`);  // get the new row
  newRange.setValues(valuesToCopy);  // set the values in the new row  */
}