const bd = [
  {
    dateOfIssue: "2023-10-29T00:00:00.000+08:00",
    before: false,
    added: false,
    materialNo: "TAC00083840",
    owedQty: 5.66,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 5.66,
  },
  {
    dateOfIssue: "2024-01-04T00:00:00.000+08:00",
    before: false,
    added: false,
    materialNo: "TAC00083840",
    owedQty: 14.711,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 14.71,
  },
];

const hk = [
  {
    materialNo: "TAC00083840",
    description: "Acetate#UN-0139 170x1400X6.0/1.88",
    kg: 1.88,
    added: false,
    qty: 16.95,
    airOrShip: "",
    remarks: "",
  },
  {
    materialNo: "TAC00083840",
    description: "Acetate#UN-0139 170x1400X6.0/1.88",
    kg: 1.88,
    added: false,
    qty: 1.85,
    airOrShip: "",
    remarks: "",
  },
  {
    materialNo: "TAC00083840",
    description: "Acetate#UN-0139 170x1400X6.0/1.88",
    kg: 1.88,
    added: false,
    qty: 1.83,
    airOrShip: "",
    remarks: "",
  },
];

const output = [
  {
    materialNo: "TAC00083840",
    description: "Acetate#UN-0139 170x1400X6.0/1.88",
    kg: 1.88,
    added: false,
    qty: 16.95,
    airOrShip: "SC",
    remarks: "",
  },
  {
    materialNo: "TAC00083840",
    description: "Acetate#UN-0139 170x1400X6.0/1.88",
    kg: 1.88,
    added: false,
    qty: 1.85,
    airOrShip: "SC",
    remarks: "",
  },
  {
    materialNo: "TAC00083840",
    description: "Acetate#UN-0139 170x1400X6.0/1.88",
    kg: 1.88,
    added: false,
    qty: 1.83,
    airOrShip: "SC",
    remarks: "",
  },
];
module.exports = { hk, bd, output };
