const cartRouter = require("express").Router();
const cartController = require("../controllers/cartController");

// cartRouter
//   .route("/")
//   .post(cartController.createCart);
  // .get(cartController.getAllCart);

cartRouter.route("/").post(cartController.getCart);
cartRouter.route("/sum").post(cartController.getCartTotal);

cartRouter.route("/feedback").post(cartController.sendOnMail);

module.exports = cartRouter;
