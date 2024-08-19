const authRouter = require("./authRouter");
const cartProductRouter = require("./cartProductRouter");
const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

const router = require("express").Router();

router.use("/users", userRouter);
router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter)
router.use("/cart-products", cartProductRouter);

module.exports = router;
