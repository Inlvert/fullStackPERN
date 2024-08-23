import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, getProducts } from "../../redux/slice/productSlice";
import "./style.css";

const ProductList = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.auth?.user);
  const cartId = useSelector((state) => state.auth?.user.cart);
  const dispatch = useDispatch();

  console.log("User ID:", user?.id);

  useEffect(() => {
    console.log("Fetching products...");
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    console.log("Attempting to add product to cart:", {
      productId,
      userId: user?.id,
      cartId: user.id,
    });

    if (user) {
      dispatch(addProductToCart({ productId, cartId, quantity: 1 }));
    } else {
      console.log("User not authenticated. Cannot add product to cart.");
    }
  };

  return (
    <div className="flex-container">
      {/* <h4>ProductList</h4> */}
      <ol>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <li key={index}>
              <div>
                <div className="wrapper">
                  <img
                    src={`http://localhost:5000/picture/${product.picture}`}
                    alt={`${product.name}`}
                    className="picture"
                  />
                  <h3>{`${product.name}`}</h3>
                  <h3>{`${product.description}`}</h3>
                  <div className="cover">
                    <h4>{`${product.price} грн`}</h4>
                    <button onClick={() => handleAddToCart(product.id)}>
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No products available.</li>
        )}
      </ol>
    </div>
  );
};

export default ProductList;
