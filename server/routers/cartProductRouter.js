const cartProductRouter = require("express").Router();
const cartProductController = require("../controllers/cartProductController");

cartProductRouter
  .route("/")
  .get(cartProductController.findAllProductFromCartProduct);

cartProductRouter
  .route("/:cartProductId")
  .delete(cartProductController.deleteProductFromCartProduct);

module.exports = cartProductRouter;
