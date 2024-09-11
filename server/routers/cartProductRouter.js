const cartProductRouter = require("express").Router();
const cartProductController = require("../controllers/cartProductController");

cartProductRouter
  .route("/")
  .get(cartProductController.findAllProductFromCartProduct);

cartProductRouter
  .route("/:cartProductId")
  .delete(cartProductController.deleteProductFromCartProduct)
  .post(cartProductController.updateProductQuantity);

cartProductRouter
  .route("/del/:cartId")
  .delete(cartProductController.deleteAllProductFromCart);

module.exports = cartProductRouter;
