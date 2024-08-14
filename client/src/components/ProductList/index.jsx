import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addProductToCart } from "../../redux/slice/productSlice";

// const ProductList = () => {
//   const products = useSelector((state) => state.product.products);
//   const user = useSelector((state) => state.user);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   const handleAddToCart = (productId) => {
//     dispatch(addProductToCart(productId));
//   };

//   return (
//     <div>
//       <h4>ProductList</h4>
//       <ol>
//         {products && products.length > 0 ? (
//           products.map((products, index) => (
//             <li key={index}>
//               <div>
//                 <h3>{`${products.name}, ${products.price} - price `}</h3>
//                 <button onClick={handleAddToCart}>add to cart</button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <li>No products available.</li>
//         )}
//       </ol>
//       <h4>Cart</h4>
//       {/* <ol>
//         {cart && cart.length > 0 ? (
//           cart.map((item, index) => (
//             <li key={index}>
//               <div>
//                 <h3>{`Product ID: ${item.productId}, Quantity: ${item.quantity}`}</h3>
//               </div>
//             </li>
//           ))
//         ) : (
//           <li>No items in cart.</li>
//         )}
//       </ol> */}
//     </div>
//   );
// };

// export default ProductList;

const ProductList = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.auth?.user);
  const cartId = useSelector((state) => state.auth?.user?.cartId);
  const dispatch = useDispatch();

  console.log("User ID:", user?.id);

  useEffect(() => {
    console.log("Fetching products...");
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    console.log("Attempting to add product to cart:", { productId, userId: user?.id, cartId: user.id });

     
    if (user) {
      dispatch(addProductToCart({ productId,cartId, quantity: 1 }));
    } else {
      console.log("User not authenticated. Cannot add product to cart.");
    }
  };

  return (
    <div>
      <h4>ProductList</h4>
      <ol>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <li key={index}>
              <div>
                <h3>{`${product.name}, ${product.price} - price `}</h3>
                <button onClick={() => handleAddToCart(product.id)}>add to cart</button>
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
