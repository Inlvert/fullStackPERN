const cartRouter = require("express").Router();
const cartController = require("../controllers/cartController");

cartRouter
  .route("/")
  .post(cartController.createCart)
  .get(cartController.getAllCart);

module.exports = cartRouter;
