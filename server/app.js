const express = require("express");
const cors = require("cors");
const basicErrorHendler = require("./middlewares/errors/basic");

const router = require('./routers')


const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(basicErrorHendler);


module.exports = app;