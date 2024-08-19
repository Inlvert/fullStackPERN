import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productSlice";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
