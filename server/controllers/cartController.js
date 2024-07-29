const { Cart } = require("../models");

module.exports.createCart = async (req, res, next) => {
  try {
    const { body } = req;

    const cart = await Cart.create(body);

    res.send({ data: cart });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllCart = async (req, res, next) => {
  try {
    const carts = await Cart.findAll();

    res.send({ data: carts });
  } catch (error) {
    next(error);
  }
};
