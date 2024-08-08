const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const { findUser } = require("../middlewares/findUser.mw");
const cartRouter = require("./cartRouter");

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers)
  .post(userController.findUserByEmail);

userRouter.post("/find", userController.findUserByEmail);

userRouter.use("/:userId/carts", findUser, cartRouter);

module.exports = userRouter;
