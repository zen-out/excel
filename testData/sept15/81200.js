const hk = [
  {
    materialNo: "TAC11181200",
    description: "Acetate#ELSH0015 165x1450x6.0/1.9",
    kg: 1.9,
    qty: 36.3,
    airOrShip: "",
    remarks: "",
    added: false,
  },
  {
    materialNo: "TAC11181200",
    description: "Acetate#ELSH0015 165x1450x6.0/1.9",
    kg: 1.9,
    qty: 37.9,
    airOrShip: "",
    remarks: "",
    added: false,
  },
  {
    materialNo: "TAC11181200",
    description: "Acetate#ELSH0015 165x1450x6.0/1.9",
    kg: 1.9,
    qty: 1.9,
    airOrShip: "",
    remarks: "",
    added: false,
  },
];
const bd = [
  {
    dateOfIssue: "2023-10-04T00:00:00.000+08:00",
    before: true,
    materialNo: "TAC11181200",
    owedQty: 37.35,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 37.35,
  },
  {
    dateOfIssue: "2023-12-31T00:00:00.000+08:00",
    before: false,
    materialNo: "TAC11181200",
    owedQty: 36.308,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 36.31,
  },
];
const output = [
  {
    materialNo: "TAC11181200",
    description: "Acetate#ELSH0015 165x1450x6.0/1.9",
    kg: 1.9,
    qty: 36.3,
    airOrShip: "SC",
    remarks: "",
  },
  {
    materialNo: "TAC11181200",
    description: "Acetate#ELSH0015 165x1450x6.0/1.9",
    kg: 1.9,
    qty: 37.9,
    airOrShip: "AC",
    remarks: "",
  },
  {
    materialNo: "TAC11181200",
    description: "Acetate#ELSH0015 165x1450x6.0/1.9",
    kg: 1.9,
    qty: 1.9,
    airOrShip: "SC",
    remarks: "",
  },
];

module.exports = { hk, bd, output };
