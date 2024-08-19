const { CartProduct, Product } = require("../models");

module.exports.findAllProductFromCartProduct = async (req, res, next) => {
  try {
    const foundProduct = await CartProduct.findAll();

    res.send({ data: foundProduct });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProductFromCartProduct = async (req, res, next) => {
  try {
    const {
      params: { cartProductId },
    } = req;

    const foundCartProduct = await CartProduct.findByPk(cartProductId, {
      include: Product
    });

    await foundCartProduct.destroy();

    res.send({ data: foundCartProduct });
  } catch (error) {
    next(error);
  }
};
