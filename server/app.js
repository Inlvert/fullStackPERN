const express = require("express");
const cors = require("cors");
const basicErrorHendler = require("./middlewares/errors/basic");
const tokenErrorHendler = require("./middlewares/errors/token")

const router = require('./routers')


const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(tokenErrorHendler);
app.use(basicErrorHendler);


module.exports = app;