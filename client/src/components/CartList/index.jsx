import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCP,
  getCart,
  getCartTotalPrice,
} from "../../redux/slice/cartSlice";

const CartList = () => {
  const cart = useSelector((state) => state.cart.cart);
  const cartPrice = useSelector((state) => state.cart);
  const cartId = useSelector((state) => state.auth?.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartId) {
      dispatch(getCart({ cartId }));
      dispatch(getCartTotalPrice({ cartId }));
    }
  }, [dispatch, cartId]);

  console.log("Cart:", cart);
  console.log("Cart ID:", cartId);

  const handleDeleteProduct = (cartProductId) => {
    dispatch(deleteProductFromCP(cartProductId));
    console.log("Deleted Product ID:", cartProductId);
  };


  return (
    <div>
      <h3>Cart List</h3>
      <p>Total Price: {cartPrice.totalPrice} $</p>
      {/* <h3>Cart Id is: {cart.id}</h3> */}
      {cart?.CartProducts && cart.CartProducts.length > 0 ? (
        <ul>
          {cart.CartProducts.map((cartProduct) => (
            <li key={cartProduct.id}>
              <p>Product Name: {cartProduct.Product.name}</p>
              <p>Quantity: {cartProduct.quantity}</p>
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
