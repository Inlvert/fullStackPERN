const { Cart, CartProduct, Product } = require("../models");

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

module.exports.getCart = async (req, res, next) => {
  try {
    const {
      body: { cartId },
    } = req;

    // const cart = await Cart.findByPk(cartId, {
    //   include: {
    //     model: CartProduct,
    //   },
    // });

    // const cart = await Cart.findAll({
    //   where: { id: cartId },
    //   // include: CartProduct
    // });

    // const cart = await Cart.findAll({
    //   where: { id: cartId },
    //   include: [
    //     {
    //       model: CartProduct,
    //       include: Product,
    //     },
    //   ],
    // });

    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [
        {
          model: CartProduct,
          include: [
            {
              model: Product, // Включаємо самі продукти
            },
          ],
        },
      ],
    });

    console.log(cart);

    if (!cart) {
      return next(createHttpError(404, "Cart not found"));
    }

    res.send({ data: cart });
  } catch (error) {
    next(error);
  }
};

module.exports.getCartTotal = async (req, res, next) => {
  try {
    const {
      body: { cartId },
    } = req;

    const cart = await Cart.findOne({
      where: { id: cartId },
      include: [
        {
          model: CartProduct,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });


    const total = cart.CartProducts.reduce((sum, cartProduct) => {
      return sum + cartProduct.quantity * cartProduct.Product.price;
    }, 0);

    res.send({ data: total });
  } catch (error) {
    next(error);
  }
};

