const _ = require("lodash");
const {
  getBeforeQty,
  getAfterQty,
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
  let afters = [];
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
        // may add condition, if there are no more other item numbers
        if (otherAfters.length > 0) {
          hk = duplicateItemWithSC(hk, hk[i], false);
        }
        hk[i].qty = getBefore;
        hk[i].airOrShip = "AC";
        // let otherAfters = _.filter(bd_filter, function (item) {
        //   return item.before === false && item.owedQty > 0;
        // });
        // let otherHKs = _.filter(hk, function (item) {
        //   return item.before === false && item.owedQty > 0;
        // });
        // // may add condition, if there are no more other item numbers
        // if (otherAfters.length > 0 && !otherHKs.length) {
        //   let duplicate = JSON.parse(JSON.stringify(hk[i]));
        //   if (materialNo.includes("81200")) {
        //     console.log("duplicate", duplicate);
        //   }
        //   afters.push(duplicate);
        // }

        // markAsAdded(hk, hk[i]);
        // let mergedArray = _.concat(afters, hk);
        // hk = _.orderBy(mergedArray, "materialNo");

        // let getBefore = getBeforeQty(hk, hk[i], actualQuantity);
        // // console.log()

        // if (materialNo == test) {
        //   console.log(hk[i], "HERE", getBefore);
        // }
        // hk[i].qty = getBefore;
        // hk[i].airOrShip = "AC";

        /* else if (hk[i].qty > actualQuantity) {
          // what's this again? // TAC11173780 // TAC11179670
          let scQty = hk[i].qty - actualQuantity;
          hk = duplicateItemWithSC(hk, hk[i], scQty.toFixed(2));
        } */
        /*
          if (otherAfters.length > 0) {
          hk = duplicateItemWithSC(hk, hk[i], false);
        } else if (hk[i].qty > actualQuantity) {
          // what's this again? // TAC11173780 // TAC11179670
          let scQty = hk[i].qty - actualQuantity;
          hk = duplicateItemWithSC(hk, hk[i], scQty.toFixed(2));
        } else {
          hk[i].qty = actualQuantity;
        }
        */
      }
    }
  }
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
              markAsAdded(bd, currBD);
            }
          }
        }
      }

      if (seaShipFlag) {
        let getAfter = getAfterQty(hk, hk[i], actualQuantity);
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
