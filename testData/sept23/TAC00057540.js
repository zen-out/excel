let hk = [
  {
    materialNo: "TAC00057540",
    description: "J-Acetate#AB1379T 170x1400x6.0/1.97",
    kg: 1.97,
    added: true,
    qty: 1.9,
    airOrShip: "AC",
    remarks: "",
  },
];
let bd = [
  {
    dateOfIssue: "2023-09-13T00:00:00.000+08:00",
    before: true,
    added: true,
    materialNo: "TAC00057540",
    owedQty: 0,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 0,
  },
  {
    dateOfIssue: "2023-10-21T00:00:00.000+08:00",
    before: true,
    added: true,
    materialNo: "TAC00057540",
    owedQty: 0,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 0,
  },
  {
    dateOfIssue: "2023-10-28T00:00:00.000+08:00",
    before: true,
    added: true,
    materialNo: "TAC00057540",
    owedQty: 7.369,
    assignMaxInTransit: "2023-05-10T00:00:00.000+08:00",
    materialShortageAfterInventory: 1.63,
  },
];
let output = [
  {
    materialNo: "TAC00057540",
    description: "J-Acetate#AB1379T 170x1400x6.0/1.97",
    kg: 1.97,
    added: false,
    qty: 1.9,
    airOrShip: "SC",
    remarks: "",
  },
];
module.exports = { hk, bd, output };
