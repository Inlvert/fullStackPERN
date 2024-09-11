import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCP,
  getCart,
  getCartTotalPrice,
  sendOnMail,
} from "../../redux/slice/cartSlice";
import {
  deleteAllProductFromCart,
  updateQuantity,
} from "../../redux/slice/cartProductSlice";

const CartList = () => {
  const cart = useSelector((state) => state.cart.cart);
  const cartPrice = useSelector((state) => state.cart);
  const cartId = useSelector((state) => state.auth?.user?.id);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({}); // Локальний стан для зберігання кількостей продуктів

  useEffect(() => {
    if (cartId) {
      dispatch(getCart({ cartId }));
      dispatch(getCartTotalPrice({ cartId }));
    }
  }, [dispatch, cartId]);

  // Ініціалізуємо кількість для кожного продукту при отриманні кошика
  useEffect(() => {
    if (cart?.CartProducts) {
      const initialQuantities = {};
      cart.CartProducts.forEach((cartProduct) => {
        initialQuantities[cartProduct.id] = cartProduct.quantity;
      });
      setQuantities(initialQuantities);
      dispatch(getCartTotalPrice({ cartId }));
    }
  }, [dispatch, cart, cartId]);

  const handleDeleteProduct = (cartProductId) => {
    dispatch(deleteProductFromCP(cartProductId));
  };

  const handleSendOrderOnMail = (cartId) => {
    dispatch(sendOnMail(cartId));
    dispatch(deleteAllProductFromCart(cartId));
  };

  const handleIncrementQuantity = async (cartProductId) => {
    const newQuantity = +quantities[cartProductId] + 1;
    try {
      await dispatch(updateQuantity({ cartProductId, quantity: newQuantity }));
      setQuantities((prev) => ({ ...prev, [cartProductId]: newQuantity }));
      dispatch(getCartTotalPrice({ cartId }));
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleDecrementQuantity = async (cartProductId) => {
    const newQuantity = quantities[cartProductId] - 1;
    try {
      if (quantities[cartProductId] > 1) {
        await dispatch(
          updateQuantity({ cartProductId, quantity: newQuantity })
        );
        setQuantities((prev) => ({ ...prev, [cartProductId]: newQuantity }));
        dispatch(getCartTotalPrice({ cartId }));
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  return (
    <div>
      <h3>Cart List</h3>
      <p>Total Price: {cartPrice.totalPrice} $</p>
      <button onClick={() => handleSendOrderOnMail(cartId)}>
        Send order on mail
      </button>
      {cart?.CartProducts && cart.CartProducts.length > 0 ? (
        <ul>
          {cart.CartProducts.map((cartProduct) => (
            <li key={cartProduct.id}>
              <p>Product Name: {cartProduct.Product.name}</p>
              <p>
                Quantity:{" "}
                <button onClick={() => handleDecrementQuantity(cartProduct.id)}>
                  -
                </button>{" "}
                {quantities[cartProduct.id]}{" "}
                <button onClick={() => handleIncrementQuantity(cartProduct.id)}>
                  +
                </button>
              </p>
              <p>Price: {cartProduct.Product.price}</p>
              <button onClick={() => handleDeleteProduct(cartProduct.id)}>
                Delete this product
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products in the cart.</p>
      )}
    </div>
  );
};

export default CartList;
