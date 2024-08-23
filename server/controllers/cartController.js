const CONSTANTS = require("../constants");
const { Cart, CartProduct, Product } = require("../models");
const nodemailer = require("nodemailer");

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

module.exports.sendOnMail = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: CONSTANTS.AUTH_USER_FOR_TRANSPORTER,
        pass: CONSTANTS.AUTH_PASS_FOR_TRANSPORTER,
      },
    });

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
              model: Product, // Включаємо самі продукти
            },
          ],
        },
      ],
    });

    const total = cart.CartProducts.reduce((sum, cartProduct) => {
      return sum + cartProduct.quantity * cartProduct.Product.price;
    }, 0);

    const cartDetails = cart.CartProducts.map(cp => `${cp.Product.name} - Quantity: ${cp.quantity}`).join('\n');

    await transporter.sendMail({
      from: "printgurucomua@gmail.com",
      to: "printgurucomua@gmail.com",
      subject: "order from site",
      text: `Order details:\n\nCart ID: ${cart.id}\nProducts:\n${cartDetails}\n\nTotal Price: ${total}`,
    });

    console.log(cart);

    res.send({ data: cart });
  } catch (error) {
    next(error);
  }
};
