// bd file
function main(
  workbook: ExcelScript.Workbook,
  inputArray: string[]
): { key: string, beforeSum: number, afterSum: number }[] {

  /*inputArray = [
    "TAC00070840",
    "TAC01114990",
    "TAC11173780",
    "TAC11179620",
    "TAC11179670",
    "TAC11179680",
    "TAC11179770",
    "TAC11181200",
    "TAC11181440",
    "TAC11184580",
    "TAC11187880",
    "TAF11178770"
  ];*/
  // inputArray = ["TAC11179670"];
  let resultObject: Record<
    string,
    { key: string, beforeSum: number, afterSum: number }
  > = {};

  // Get the current worksheet.
  let worksheet = workbook.getActiveWorksheet();
  let lastRow = worksheet.getUsedRange(true).getRowCount();

  // Get the current date and add 35 days.
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 35);

  // Get the upcoming Wednesday.
  let nextWednesday = getNextWednesday(targetDate);

  // Get the column.
  let aaColumn = worksheet.getRange(`AA3:AA${lastRow}`).getValues();
  let yColumn = worksheet.getRange(`Y3:Y${lastRow}`).getValues();
  let asColumn = worksheet.getRange(`AS3:AS${lastRow}`).getValues();
  let bcColumn = worksheet.getRange(`BC3:BC${lastRow}`).getValues();
  let bdColumn = worksheet.getRange(`BD3:BD${lastRow}`).getValues();
  // Loop through the AA column.
  for (let i = 0; i < aaColumn.length; i++) {
    let materialNumber = aaColumn[i][0].toString().trim();
    // does this row's material number (column AA) contain column D from HK? 
    if (inputArray.includes(materialNumber)) {
      // 
      // console.log(`Material number: ${materialNumber}`);
      let serialIssueDate: number = yColumn[i][0] as number;
      let dateOfIssue: Date = getDate(serialIssueDate);
      let owedQuantity: number = parseFloat(asColumn[i][0].toString().trim());
      let materialShortage: number = parseFloat(bdColumn[i][0].toString().trim());
      let serialDateNumber: number = bcColumn[i][0] as number;
      let maxTransitDate: Date;
      if (typeof serialDateNumber === 'number') {
        maxTransitDate = getDate(serialDateNumber);
      } else {
        maxTransitDate = new Date('1991-01-01')
      }

      if (maxTransitDate <= dateOfIssue && materialShortage == 0) {

      } else {
        if (!resultObject[`${materialNumber}`]) {
          resultObject[`${materialNumber}`] = {
            key: materialNumber,
            beforeSum: 0,
            afterSum: 0,
          };
        }
        if (dateOfIssue > nextWednesday) {
          if (maxTransitDate <= dateOfIssue && materialShortage > 0 && maxTransitDate.getTime() !== new Date('1991-01-01').getTime()) {
            resultObject[`${materialNumber}`].afterSum += materialShortage;
          } else {
            resultObject[`${materialNumber}`].afterSum += owedQuantity;
          }
        } else if (dateOfIssue < nextWednesday) {
          if (maxTransitDate <= dateOfIssue && materialShortage > 0 && maxTransitDate.getTime() !== new Date('1991-01-01').getTime()) {
            resultObject[`${materialNumber}`].beforeSum += materialShortage + 0.3;
          } else {
            resultObject[`${materialNumber}`].beforeSum += owedQuantity + 0.3;
          }
        }
      }
    }

  }

  let resultArray = Object.values(resultObject);
  console.log(`beforeSum: ${resultArray[0].beforeSum}`);
  console.log(`afterSum: ${resultArray[0].afterSum}`);
  return resultArray;

  // return resultArray;
}

function getNextWednesday(date: Date) {
  let resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + ((3 - 1 - date.getDay() + 7) % 7) + 1);
  return resultDate;
}
function getDate(serialDateNumber: number): Date {
  let officialDate: Date;
  if (serialDateNumber) {
    if (serialDateNumber > 60) {
      serialDateNumber -= 1;
    }
    // Create a date object for 1900-01-01
    const baseDate = new Date(Date.UTC(1900, 0, 1));
    baseDate.setUTCDate(baseDate.getUTCDate() + serialDateNumber);

    // Add the number of days to 1900-01-01
    officialDate = new Date(baseDate.getTime() - 24 * 60 * 60 * 1000);

    // check if the cell is not empty
  } else {
    officialDate = new Date('1991-01-01');
  }
  return officialDate;
}