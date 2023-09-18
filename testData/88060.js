const bd = [
  {
    dateOfIssue: "2023-10-18T00:00:00.000+08:00",
    before: true,
    added: false,
    materialNo: "TAC11188060",
    owedQty: 0.46,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 0.46,
  },
  {
    dateOfIssue: "2023-10-06T00:00:00.000+08:00",
    before: true,
    added: false,
    materialNo: "TAC11188060",
    owedQty: 0.3,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 0.3,
  },
  {
    dateOfIssue: "2023-10-04T00:00:00.000+08:00",
    before: true,
    added: false,
    materialNo: "TAC11188060",
    owedQty: 0.276,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 0.28,
  },
  {
    dateOfIssue: "2024-01-04T00:00:00.000+08:00",
    before: false,
    added: false,
    materialNo: "TAC11188060",
    owedQty: 5.06,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 5.06,
  },
];

const hk = [
  {
    materialNo: "TAC11188060",
    description: "Acetate#VLA2A110 168x700x6.0/0.92",
    kg: 0.92,
    added: false,
    qty: 0.9,
    airOrShip: "",
    remarks: "",
  },
  {
    materialNo: "TAC11188060",
    description: "Acetate#VLA2A110 168x700x6.0/0.92",
    kg: 0.92,
    added: false,
    qty: 4.6,
    airOrShip: "",
    remarks: "",
  },
];

const output = [
  {
    materialNo: "TAC11188060",
    description: "Acetate#VLA2A110 168x700x6.0/0.92",
    kg: 0.92,
    added: false,
    qty: 2.76,
    airOrShip: "SC",
    remarks: "急用，請安排走9月15日空運",
  },
  {
    materialNo: "TAC11188060",
    description: "Acetate#VLA2A110 168x700x6.0/0.92",
    kg: 0.92,
    added: false,
    qty: 1.84,
    airOrShip: "AC",
    remarks: "拆一條空運，其余船運，急用，請安排走9月15日空運",
  },
  {
    materialNo: "TAC11188060",
    description: "Acetate#VLA2A110 168x700x6.0/0.92",
    kg: 0.92,
    added: false,
    qty: 0.9,
    airOrShip: "SC",
    remarks: "拆一條空運，其余船運",
  },
];

module.exports = { hk, output, bd };
