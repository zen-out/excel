
  let hk = [{"materialNo":"TAC11161410","description":"J-Acetate#AB3033T 170x1400x6.0/1.97","kg":1.97,"added":true,"qty":13.2,"airOrShip":"AC","remarks":""}];
  let bd = [{"dateOfIssue":"2023-09-28T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11161410","owedQty":0,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":0},{"dateOfIssue":"2023-10-13T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11161410","owedQty":5.106,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":5.11},{"dateOfIssue":"2023-10-30T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11161410","owedQty":7.69,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":7.69},{"dateOfIssue":"2024-10-01T00:00:00.000+08:00","before":false,"added":false,"materialNo":"TAC11161410","owedQty":9.822,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":9.82}];
  let output = [{"materialNo":"TAC11161410","description":"J-Acetate#AB3033T 170x1400x6.0/1.97","kg":1.97,"added":false,"qty":5.91,"airOrShip":"AC","remarks":"拆3条空运其余船运"},{"materialNo":"TAC11161410","description":"J-Acetate#AB3033T 170x1400x6.0/1.97","kg":1.97,"added":false,"qty":7.29,"airOrShip":"SC","remarks":"拆3条空运其余船运"}];
  module.exports = {hk, bd, output};
  