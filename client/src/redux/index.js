import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productSlice";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import cartProductReducer from "./slice/cartProductSlice";

const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    cartProduct: cartProductReducer,
  },
});

export default store;
