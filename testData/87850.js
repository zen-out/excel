const bd = [
  {
    dateOfIssue: "2023-09-29T00:00:00.000+08:00",
    before: true,
    added: false,
    materialNo: "TAC11187850",
    owedQty: 57.816,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 57.82,
  },
  {
    dateOfIssue: "2023-09-24T00:00:00.000+08:00",
    before: true,
    added: false,
    materialNo: "TAC11187850",
    owedQty: 14.436,
    assignMaxInTransit: "Invalid DateTime",
    materialShortageAfterInventory: 14.44,
  },
];

const hk = [
  {
    materialNo: "TAC11187850",
    description: "Acetate#UN-0041 170x1400x8.0/2.52",
    kg: 2.52,
    added: false,
    qty: 74.96,
    airOrShip: "",
    remarks: "",
  },
];

const output = [
  {
    materialNo: "TAC11187850",
    description: "Acetate#UN-0041 170x1400x8.0/2.52",
    kg: 2.52,
    added: false,
    qty: 74.96,
    airOrShip: "AC",
    remarks: "讓步收貨",
  },
];

module.exports = { hk, bd, output };
