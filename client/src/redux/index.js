import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productSlice";
import authReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
  },
});

export default store;
