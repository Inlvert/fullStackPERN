const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const { findUser } = require("../middlewares/findUser.mw");
const cartRouter = require("./cartRouter");

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

  userRouter.use("/:userId/carts", findUser, cartRouter);

module.exports = userRouter;
