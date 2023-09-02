// hk file
function main(workbook: ExcelScript.Workbook) {
  let selectedSheet = workbook.getActiveWorksheet();
  let columnDRange = selectedSheet.getRange(
    "D2:D" + selectedSheet.getUsedRange(true).getRowCount()
  );
  let columnDValues = columnDRange.getValues();

  let flatArray = columnDValues.reduce((acc, val) => {
    if (typeof val[0] === "string") {
      return acc.concat(val[0].trim());
    } else {
      return acc;
    }
  }, []);
  return flatArray;
}
