const { where } = require("sequelize");
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
      include: Product,
    });

    await foundCartProduct.destroy();

    res.send({ data: foundCartProduct });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteAllProductFromCart = async (req, res, next) => {
  try {
    const {
      params: { cartId },
    } = req;

    const foundCartProducts = await CartProduct.findAll({
      where: { cartId },
    });

    await CartProduct.destroy({
      where: { cartId },
    });

    res.send({
      data: foundCartProducts,
      message: "All products have been deleted from the cart.",
    });
  } catch (error) {
    next(error);
  }
};
