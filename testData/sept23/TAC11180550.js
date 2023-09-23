
  let hk = [{"materialNo":"TAC11180550","description":"J-Acetate#270159T 170x1400x6.0/1.97","kg":1.97,"added":false,"qty":33.48,"airOrShip":"","remarks":""},{"materialNo":"TAC11180550","description":"J-Acetate#270159T 170x1400x6.0/1.97","kg":1.97,"added":false,"qty":15.1,"airOrShip":"","remarks":""}];
  let bd = [{"dateOfIssue":"2023-10-20T00:00:00.000+08:00","before":true,"added":false,"materialNo":"TAC11180550","owedQty":49.053,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":49.05},{"dateOfIssue":"2023-10-25T00:00:00.000+08:00","before":true,"added":false,"materialNo":"TAC11180550","owedQty":28.013,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":28.01},{"dateOfIssue":"2023-12-06T00:00:00.000+08:00","before":false,"added":false,"materialNo":"TAC11180550","owedQty":15.74,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":15.74},{"dateOfIssue":"2024-01-02T00:00:00.000+08:00","before":false,"added":false,"materialNo":"TAC11180550","owedQty":17.786,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":17.79},{"dateOfIssue":"2024-01-18T00:00:00.000+08:00","before":false,"added":false,"materialNo":"TAC11180550","owedQty":12.687,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":12.69},{"dateOfIssue":"2024-10-01T00:00:00.000+08:00","before":false,"added":false,"materialNo":"TAC11180550","owedQty":14.24,"assignMaxInTransit":"Invalid DateTime","materialShortageAfterInventory":14.24}];
  let output = [{"materialNo":"TAC11180550","description":"J-Acetate#270159T 170x1400x6.0/1.97","kg":1.97,"added":false,"qty":33.48,"airOrShip":"AC","remarks":""},{"materialNo":"TAC11180550","description":"J-Acetate#270159T 170x1400x6.0/1.97","kg":1.97,"added":false,"qty":15.1,"airOrShip":"AC","remarks":""}];
  module.exports = {hk, bd, output};
  