require("dotenv").config();

const {
  PORT
} = process.env;

const CONSTANTS = {
  PORT: process.env.PORT || 5000,
};

module.exports = CONSTANTS;
