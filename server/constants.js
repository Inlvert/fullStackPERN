require("dotenv").config();

const {
<<<<<<< HEAD
  ACCES_TOKEN_SECRET,
  ACCES_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  PORT,
  AUTH_USER_FOR_TRANSPORTER,
  AUTH_PASS_FOR_TRANSPORTER
=======
  PORT
>>>>>>> 164ba3e (add new folder)
} = process.env;

const CONSTANTS = {
  PORT: process.env.PORT || 5000,
<<<<<<< HEAD
  ACCES_TOKEN_SECRET,
  ACCES_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  AUTH_USER_FOR_TRANSPORTER,
  AUTH_PASS_FOR_TRANSPORTER
};

module.exports = CONSTANTS;
=======
};

module.exports = CONSTANTS;
>>>>>>> 164ba3e (add new folder)
