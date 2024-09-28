import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../redux/slice/productSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);

  console.log("Product ID:", productId);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <img src={`http://localhost:5000/picture/${product.picture}`} alt={product.name} />
          <p>{product.description}</p>
          <p>Price: {product.price} грн</p>
          {/* Тут можна додати додаткові фото та інші деталі */}
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
