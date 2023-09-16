function jsDateToExcelDate(date) {
  const epoch = new Date(1899, 11, 31);
  const differenceInMilliseconds = date.getTime() - epoch.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  // Add 1 to the difference because Excel's epoch date is considered to be Day 1, not Day 0
  return Math.floor(differenceInDays) + 1;
}

// let g = ;
let excelDate = jsDateToExcelDate(new Date("1994-12-11T00:00:00Z"));
console.log(excelDate);
function excelDateToJSDate(serial) {
  const epoch = new Date(Date.UTC(1899, 11, 31));
  let getDate = new Date(
    Date.UTC(
      epoch.getUTCFullYear(),
      epoch.getUTCMonth(),
      epoch.getUTCDate() + serial - 1
    )
  );
  console.log(getDate.toISOString());
  return getDate;
}
let date = excelDateToJSDate(34679);
console.log(date);
