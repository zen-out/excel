const { DateTime, Duration } = require("luxon");
const { FORMAT_DATE_OF_ISSUE } = require("./variables.js");
// change to luxon date parameter

function excelDateToJSDate(serial) {
  const excelEpoch = DateTime.fromObject({ year: 1899, month: 12, day: 30 });
  const msInDay = Duration.fromObject({ days: 1 }).as("milliseconds");
  let luxonDate = excelEpoch.plus({ milliseconds: serial * msInDay });
  let jsDate = luxonDate.toJSDate();
  let timezoneOffsetInHours = 8;
  jsDate.setHours(jsDate.getHours() + timezoneOffsetInHours);
  luxonDate = DateTime.fromJSDate(jsDate).startOf("day");
  return luxonDate.toString();
}
function convertToDate(stringOrNum, format, test) {
  let returnDate;
  if (typeof stringOrNum === "string") {
    let trimmed = stringOrNum.trim();
    returnDate = DateTime.fromFormat(trimmed, format);
    returnDate = returnDate.startOf("day");
    return returnDate.toString();
  } else if (typeof stringOrNum === "number") {
    returnDate = excelDateToJSDate(stringOrNum);
    return returnDate;
  } else {
    returnDate = null;
    return returnDate;
  }
}

function getNextWedAndDays(jsDate) {
  let date = DateTime.fromJSDate(jsDate);
  while (date.weekday !== 3) {
    date = date.plus({ days: 1 });
  }
  date = date.plus({ days: 35 });
  return date.toString();
}

function isSecondDateLater(date1, date2) {
  let luxonDate1 = DateTime.fromISO(date1);
  let luxonDate2 = DateTime.fromISO(date2);
  return luxonDate2 > luxonDate1;
}

module.exports = {
  convertToDate,
  excelDateToJSDate,
  getNextWedAndDays,
  isSecondDateLater,
};
