function main(
  workbook: ExcelScript.Workbook,
  inputArray: { key: string, beforeSum: number, afterSum: number }[]
) {
  // Your code here
  inputArray = [
    {
      key: "TAC00070840",
      beforeSum: 13.203000000000001,
      afterSum: 31.644000000000002,
    },
  ];
  let getItemNumbers = inputArray.map((item) => item.key);
  // Get the current worksheet.
  let worksheet = workbook.getActiveWorksheet();
  let lastRow = worksheet.getUsedRange(true).getRowCount();
  let dColumn = worksheet.getRange(`D3:D${lastRow}`).getValues();
  let fColumn = worksheet.getRange(`F3:F${lastRow}`).getValues();
  let hColumn = worksheet.getRange(`H3:H${lastRow}`).getValues();
  let kColumn = worksheet.getRange(`K3:K${lastRow}`).getValues();
  let nColumn = worksheet.getRange(`N3:N${lastRow}`).getValues();
  for (let i = 0; i < dColumn.length; i++) {
    let itemNumber = dColumn[i][0].toString().trim();
    // if the getItemNumbers includes the cell, then grab the beforeSum
    if (getItemNumbers.includes(itemNumber)) {
      let matchingObject = inputArray.find(item => item.key === itemNumber);
      console.log(matchingObject, "here")
      let beforeSum = matchingObject ? matchingObject.beforeSum : null;
      let afterSum = matchingObject ? matchingObject.afterSum : null;
      let qty: number = hColumn[i][0] as number;
      let scQty: number;
      if (qty > beforeSum) {
        // set column K
        let getRow: number = i + 3; 
        worksheet.getRange(`K${getRow}`).setValue("AC");
        worksheet.getRange(`H${getRow}`).setValue(beforeSum);
        let itemDescription = fColumn[i][0].toString().trim();
        let getItemWeight = getLastNumber(itemDescription);
        let rounded = Math.ceil(beforeSum / getItemWeight);
        worksheet.getRange(`N${getRow}`).setValue(`AC ${rounded}kg, the rest SC`);
        const sheet = workbook.getActiveWorksheet();
        sheet.getRange(`A${getRow}`).getEntireRow().insert(ExcelScript.InsertShiftDirection.down);
        const rangeToCopy = sheet.getRange(`A${getRow + 1}:N${getRow + 1}`);  // specify the row to duplicate
        const valuesToCopy = rangeToCopy.getValues();
        let getK = getLetterPosition("K");
        valuesToCopy[0][getK] = "SC";
        let getH = getLetterPosition("H");
        scQty = qty - beforeSum;
        valuesToCopy[0][getH] = scQty; 
        console.log(valuesToCopy);
        const newRange = sheet.getRange(`A${getRow}:N${getRow}`);  // get the new row
        newRange.setValues(valuesToCopy);
      
      }



      let itemDescription = fColumn[i][0].toString().trim();
      let itemKg = getLastNumber(itemDescription);

    }
  }
}

function getLetterPosition(letter: string): number {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const position = alphabet.indexOf(letter.toUpperCase());
  if (position === -1) {
    throw new Error(`Invalid input: ${letter}. Input must be a single English alphabet letter.`);
  }
  return position;
}


function getLastNumber(s: string): number | null {
  const match = s.match(/(\d+(\.\d+)?)\D*$/);
  return match ? parseFloat(match[1]) : null;
}


function insertAndCopyAbove(workbook: ExcelScript.Workbook, row: number) {
  const sheet = workbook.getActiveWorksheet();
  sheet.getRange(`A${row}`).getEntireRow().insert(ExcelScript.InsertShiftDirection.down);
  const rangeToCopy = sheet.getRange(`A${row + 1}:N${row + 1}`);  // specify the row to duplicate
  const valuesToCopy = rangeToCopy.getValues();
  const newRange = sheet.getRange(`A${row}:N${row}`);  // get the new row
  newRange.setValues(valuesToCopy);
}