import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  getProducts,
  getProductsDesc,
} from "../../redux/slice/productSlice";
import { Link } from "react-router-dom";
import style from "./ProductList.module.scss";
import classNames from "classnames";
import { ThemContext } from "../../contexts";
import CONSTANTS from "../../constants";

const ProductList = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.auth?.user);
  const cartId = useSelector((state) => state.auth?.user.cart);
  const dispatch = useDispatch();

  console.log("User ID:", user?.id);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedProducts = products.slice().sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

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

  const handelGetProductsDesc = () => {
    dispatch(getProductsDesc());
  };

  return (
    <ThemContext.Consumer>
      {([theme]) => {
        const className = classNames({
          [style.lightTheme]: theme === CONSTANTS.THEMES.LIGHT_THEM,
          [style.darkTheme]: theme === CONSTANTS.THEMES.DARK_THEM,
        });
        return (
          <div className={className}>
            <div className={style.flexContainer}>
              {/* <h4>ProductList</h4> */}
              <button onClick={() => handleSortChange("asc")}>
                Sort by Price (Asc)
              </button>
              <button onClick={() => handleSortChange("desc")}>
                Sort by Price (Desc)
              </button>
              <ol>
                {sortedProducts && sortedProducts.length > 0 ? (
                  sortedProducts.map((product, index) => (
                    <li key={index}>
                      <div>
                        <div className={style.wrapper}>
                          <img
                            src={`http://localhost:5000/picture/${product.picture}`}
                            alt={`${product.name}`}
                            className={style.picture}
                          />
                          <h3>{`${product.name}`}</h3>
                          <h3>{`${product.description}`}</h3>
                          <div className={style.cover}>
                            <h4>{`${product.price} грн`}</h4>
                            <button onClick={() => handleAddToCart(product.id)}>
                              add to cart
                            </button>
                            <Link to={`/products/${product.id}`}>
                              <button>View Details</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No products available.</li>
                )}
              </ol>
              <button onClick={handelGetProductsDesc}>desc</button>
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
          </div>
        );
      }}
    </ThemContext.Consumer>
  );
};

export default ProductList;
