
  let hk = [{"materialNo":"TAC11164410","description":"J-Acetate#AB2884T 170x1400x6.0/1.97","kg":1.97,"added":true,"qty":1.9,"airOrShip":"AC","remarks":""}];
  let bd = [{"dateOfIssue":"2023-05-13T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11164410","owedQty":0,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":0},{"dateOfIssue":"2023-05-13T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11164410","owedQty":0,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":0},{"dateOfIssue":"2023-10-30T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11164410","owedQty":0.774,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":0.77}];
  let output = [{"materialNo":"TAC11164410","description":"J-Acetate#AB2884T 170x1400x6.0/1.97","kg":1.97,"added":false,"qty":1.9,"airOrShip":"SC","remarks":""}];
  module.exports = {hk, bd, output};
  