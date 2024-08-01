import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productSlice";

const store = configureStore({
  reducer: {
    product: productsReducer
  },
});

export default store;
