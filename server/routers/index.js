const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

const router = require("express").Router();

router.use("/users", userRouter);
router.use("/carts", cartRouter);
router.use("/products", productRouter);

module.exports = router;
