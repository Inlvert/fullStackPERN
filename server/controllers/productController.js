const { Product, Cart, CartProduct } = require("../models");

module.exports.createProduct = async (req, res, next) => {
  try {
    const { body, file } = req;

    const product = await Product.create({ ...body, picture: file.filename });

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await Product.findByPk(productId);

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllProductsOrder = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["price", "DESC"]], // Сортувати по ціні у порядку спадання
    });
    res.send({ data: products });
  } catch (error) {
    next(error);
  }
};

// module.exports.addProductToCart = async (req, res, next) => {
//   try {
//     const {
//       params: { productId },
//     } = req;
//     const {
//       body: { cartId, quantity },
//     } = req;

//     // Find the product
//     const product = await Product.findByPk(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Find or create the cart
//     let cart = await Cart.findByPk(cartId);
//     if (!cart) {
//       cart = await Cart.create({ userId: req.user.id }); // Assuming you have user info in req.user
//     }

//     // Find or create the CartProduct entry
//     const [cartProduct, created] = await CartProduct.findOrCreate({
//       where: { cartId: cart.id, productId: product.id },
//       defaults: { quantity: quantity || 1 },
//     });

//     if (!created) {
//       // If the product is already in the cart, update the quantity
//       cartProduct.quantity += quantity || 1;
//       await cartProduct.save();
//     }

//     res.status(200).json({ message: "Product added to cart", cartProduct });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.addProductToCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { cartId, quantity } = req.body;

    console.log("Received productId:", productId);
    console.log("Received cartId:", cartId);
    console.log("Received quantity:", quantity);

    // Знайти товар
    const product = await Product.findByPk(productId);
    if (!product) {
      console.log("Product not found for ID:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    // Знайти або створити кошик
    let cart = await Cart.findByPk(cartId);
    if (!cart) {
      console.log(
        "Cart not found, creating new cart for user ID:",
        req.user.id
      );
      cart = await Cart.create({ userId: req.user.id });
    }

    // Знайти або створити запис у CartProduct
    const [cartProduct, created] = await CartProduct.findOrCreate({
      where: { cartId: cart.id, productId: product.id },
      defaults: { quantity: quantity || 1 },
    });

    if (!created) {
      // Якщо товар вже є в кошику, оновлюємо кількість
      cartProduct.quantity =
        Number(cartProduct.quantity) + Number(quantity || 1);
      await cartProduct.save();
    }

    res.status(200).json({ message: "Product added to cart", cartProduct });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    next(error);
  }
};
