const productRouter = require("express").Router();
const productController = require("../controllers/productController");
const { imageUpload } = require("../utils/imageUpload");

productRouter
  .route("/")
  .post(imageUpload.single("picture"), productController.createProduct)
  .get(productController.findAllProducts);

productRouter.route("/desc").get(productController.findAllProductsOrder);

productRouter
  .route("/:productId")
  .post(productController.addProductToCart)
  .get(productController.getProductById);

module.exports = productRouter;
