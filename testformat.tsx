
function getNextWednesday2(date: Date) {
  let resultDate = new Date(date.getTime());
  resultDate.setDate(date.getDate() + ((3 - 1 - date.getDay() + 7) % 7) + 1);
  return resultDate;
}
