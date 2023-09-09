const _ = require("lodash");
const {
  getBeforeQty,
  getAfterQtyPartOne,
  getAfterQtyPartTwo,
  markAsAdded,
  duplicateItemWithSC,
} = require("./functions.js");

function getBeforeQuantity(bd, bd_filter) {
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
          markAsAdded(bd, currBD);
        } else if (currBD.owedQty != 0) {
          actualQuantity = actualQuantity += currBD.owedQty;
          airShipFlag = true;
          markAsAdded(bd, currBD);
        }
      }
    }
  }
  return { airShipFlag, actualQuantity };
}
function markBefores(hk, bd, test) {
  for (let i = 0; i < hk.length; i++) {
    if (!hk[i].added) {
      let materialNo = hk[i].materialNo;
      let bd_filter = _.filter(bd, { materialNo: materialNo });
      let { airShipFlag, actualQuantity } = getBeforeQuantity(bd, bd_filter);
      if (airShipFlag) {
        let getBefore = getBeforeQty(hk, hk[i], actualQuantity);
        let otherAfters = _.filter(bd_filter, function (item) {
          return item.before === false && item.owedQty > 0;
        });
        if (otherAfters.length > 0) {
          hk = duplicateItemWithSC(hk, hk[i], false);
        }
        hk[i].qty = getBefore;
        hk[i].airOrShip = "AC";
        markAsAdded(hk, hk[i]);
      }
      if (test == materialNo) {
        // console.log(hk[i], "each one");
      }
    }
  }
  hk = _.orderBy(hk, ["qty"], ["desc"]);
  bd = _.orderBy(bd, ["owedQty"], ["desc"]);
  return { hk, bd };
}

function markAfters(hk, bd, test) {
  for (let i = 0; i < hk.length; i++) {
    if (!hk[i].added) {
      console.log(hk[i]);
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
              markAsAdded(bd, currBD);
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
        markAsAdded(hk, hk[i]);
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
