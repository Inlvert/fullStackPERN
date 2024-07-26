const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const basicErrorHendler = require("./middlewares/errors/basic");
const tokenErrorHendler = require("./middlewares/errors/token")

const router = require('./routers')
=======
>>>>>>> 164ba3e (add new folder)


const app = express();
app.use(express.json());
app.use(cors());
<<<<<<< HEAD
app.use(router);
app.use(tokenErrorHendler);
app.use(basicErrorHendler);

app.use(express.static('public'))
=======
>>>>>>> 164ba3e (add new folder)


module.exports = app;