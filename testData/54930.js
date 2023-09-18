const bd = [
  {
    dateOfIssue: "2023-10-30T00:00:00.000+08:00",
    before: false,
    added: false,
    materialNo: "TAC11154930",
    owedQty: 1.864,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 1.86,
  },
  {
    dateOfIssue: "2023-10-30T00:00:00.000+08:00",
    before: false,
    added: false,
    materialNo: "TAC11154930",
    owedQty: 1.864,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 1.86,
  },
  {
    dateOfIssue: "2023-09-29T00:00:00.000+08:00",
    before: true,
    added: false,
    materialNo: "TAC11154930",
    owedQty: 37.444,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 37.44,
  },
  {
    dateOfIssue: "2023-09-29T00:00:00.000+08:00",
    before: true,
    added: false,
    materialNo: "TAC11154930",
    owedQty: 48.891,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 48.89,
  },
];
const hk = [
  {
    materialNo: "TAC11154930",
    description: "Acetate#UF2-0290 膠板料170x700x4.0/0.62",
    kg: 0.62,
    added: false,
    qty: 81.98,
    airOrShip: "",
    remarks: "",
  },
  {
    materialNo: "TAC11154930",
    description: "Acetate#UF2-0290 膠板料170x700x4.0/0.62",
    kg: 0.62,
    added: false,
    qty: 4.95,
    airOrShip: "",
    remarks: "",
  },
];

const output = [
  {
    materialNo: "TAC11154930",
    description: "Acetate#UF2-0290 膠板料170x700x4.0/0.62",
    kg: 0.62,
    added: false,
    qty: 81.98,
    airOrShip: "AC",
    remarks: "急走9月15日空運",
  },
  {
    materialNo: "TAC11154930",
    description: "Acetate#UF2-0290 膠板料170x700x4.0/0.62",
    kg: 0.62,
    added: false,
    qty: 4.95,
    airOrShip: "AC",
    remarks: "急走9月15日空運",
  },
];

module.exports = { hk, bd, output };
