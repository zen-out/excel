const _ = require("lodash");
const {
  getBeforeQty,
  getBeforeCalculatedQuantity,
  getAfterQtyPartOne,
  getAfterQtyPartTwo,
  markBDAdded,
  markHKAdded,
  duplicateItemWithSC,
} = require("./functions.js");

function getBeforeActualQuantity(bd, bd_filter) {
  let actualQuantity = 0;
  let airShipFlag = false;
  for (let j = 0; j < bd_filter.length; j++) {
    let currBD = bd_filter[j];
    if (!currBD.added) {
      if (currBD.before) {
        // If it has an assign max in transit date, and its date is creater than date of issue, and it's allocate in transit date is not zero
        if (
          !isNaN(currBD.assignMaxInTransit) &&
          currBD.assignMaxInTransit > currBD.dateOfIssue &&
          currBD.allocateInTransit != 0
        ) {
          airShipFlag = true;
          // add allocate in transit to actualQuantity
          actualQuantity = actualQuantity + currBD.allocateInTransit;
          markBDAdded(bd, currBD);
        } else if (currBD.owedQty != 0) {
          actualQuantity = actualQuantity += currBD.owedQty;
          airShipFlag = true;
          markBDAdded(bd, currBD);
        }
      }
    }
  }

  return { airShipFlag, actualQuantity };
}
function markBefores(hk, bd, test) {
  for (let i = 0; i < hk.length; i++) {
    let materialNo = hk[i].materialNo;
    if (!hk[i].added) {
      let bd_filter = _.filter(bd, { materialNo: materialNo });
      let { airShipFlag, actualQuantity } = getBeforeActualQuantity(
        bd,
        bd_filter
      );
      if (airShipFlag) {
        hk = getBeforeQty(hk, hk[i], bd, actualQuantity);
      }
    }
  }
  hk = _.orderBy(hk, ["airOrShip", "materialNo"], ["asc", "asc"]);
  bd = _.orderBy(bd, ["owedQty"], ["desc"]);
  return { hk, bd };
}

function markAfters(hk, bd, test) {
  for (let i = 0; i < hk.length; i++) {
    if (!hk[i].added) {
      let actualQuantity = 0;
      let materialNo = hk[i].materialNo;
      let bd_filter = _.filter(bd, { materialNo: materialNo });
      let splitOccured = false;
      let seaShipFlag = false;
      // Loop through filtered bd
      for (let j = 0; j < bd_filter.length; j++) {
        let currBD = bd_filter[j];
        if (!currBD.added) {
          if (!currBD.before) {
            if (currBD.owedQty != 0) {
              actualQuantity += currBD.owedQty;
              seaShipFlag = true;
              markBDAdded(bd, currBD);
            }
          }
        }
      }

      if (seaShipFlag) {
        let getAfter = getAfterQtyPartOne(hk, hk[i], actualQuantity);
        hk[i].airOrShip = "SC";
        if (hk[i].qty < hk[i].kg) {
          hk[i].qty = hk[i].kg;
        }
        markHKAdded(hk, hk[i]);
      }
    }
  }

  return { hk, bd };
}

function markRemarks(original, hk, bd) {
  for (let i = 0; i < hk.length; i++) {
    let getBefore = _.find(hk, {
      materialNo: hk[i].materialNo,
      airOrShip: "AC",
    });
    if (getBefore) {
      let getIndex = _.findIndex(hk, {
        materialNo: hk[i].materialNo,
        airOrShip: "AC",
      });
      hk[getIndex].remarks = `AC ${getBefore.qty}, SC rest`;
      actualQuantity = hk[i].qty - getBefore.qty;
      hk[i].remarks = `AC ${getBefore.qty}, SC rest`;
    }
  }
}
module.exports = { markBefores, markAfters };
