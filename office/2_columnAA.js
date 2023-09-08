// bd file
function main(workbook: ExcelScript.Workbook) {
  let selectedSheet = workbook.getActiveWorksheet();
  let columnRange = selectedSheet.getRange(
    "AA3:AA" + selectedSheet.getUsedRange(true).getRowCount()
  );
  let columValues = columnRange.getValues();
  let flatArray = columValues.reduce((acc, val) => {
    if (typeof val[0] === "string") {
      return acc.concat(val[0].trim());
    } else {
      return acc;
    }
  }, []);
  return flatArray;
}
