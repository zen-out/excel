const reader = require("xlsx");
const _ = require("lodash");

let materialNo = "TAC00070840";

function eachBD(hk, bd) {
  let materialNos = hk.map((obj) => obj.materialNo);
  for (let i = 0; i < materialNos.length; i++) {
    let run = eachItem(hk, bd, materialNos[i]);
  }
}
function eachItem(hk, bd, materialNo) {
  let hk_filter = hk.filter((getObj) => {
    getObj.materialNo = materialNo;
  });
  let bd_filter = bd.filter((getObj) => {
    getObj.materialNo = materialNo;
  });
  let splitOccured = false;
  let totalAirShip = 0;
  let totalSeaShip = 0;
  let airShipFlag = false;
  for (let i = 0; i < bd_filter; i++) {}
  let befores = currentBD.filter((getObj) => {
    getObj.before = true;
  });
  let afters = currentBD.filter((getObj) => {
    getObj.before = false;
  });
  let beforeSum = befores.reduce((sum, obj) => sum + obj.owedQty, 0);
}

module.exports = { eachBD };
