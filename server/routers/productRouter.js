const productRouter = require("express").Router();
const productController = require("../controllers/productController");

productRouter
  .route("/")
  .post(productController.createProduct)
  .get(productController.findAllProducts);

productRouter
  .route("/:productId")
  .post(productController.addProductToCart)
  

module.exports = productRouter;
