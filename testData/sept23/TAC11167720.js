
  let hk = [{"materialNo":"TAC11167720","description":"J-Acetate#016762CTN 320x360x4.0/0.61","kg":0.61,"added":true,"qty":1.8,"airOrShip":"AC","remarks":""}];
  let bd = [{"dateOfIssue":"2023-11-01T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11167720","owedQty":0.739,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":0.74},{"dateOfIssue":"2023-11-01T00:00:00.000+08:00","before":true,"added":true,"materialNo":"TAC11167720","owedQty":0.907,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":0.91}];
  let output = [{"materialNo":"TAC11167720","description":"J-Acetate#016762CTN 320x360x4.0/0.61","kg":0.61,"added":false,"qty":1.8,"airOrShip":"SC","remarks":""}];
  module.exports = {hk, bd, output};
  