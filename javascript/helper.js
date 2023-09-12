const _ = require("lodash");
const reader = require("xlsx");
const fs = require("fs");
const {
  DAYS_TO_ADD,
  OUTPUT_FILE,
  WEIGHT_TO_ADD,
  CURRENT_DATE,
} = require("./variables.js");

// TO DO
// create a function that returns chinese
