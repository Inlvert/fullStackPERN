import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "products";

let initialState = {
  products: [],
  cart: [],
  isLoading: false,
  error: null,
};

const getProducts = createAsyncThunk(
  `${SLICE_NAME}/get`,
  async (productData, thunkAPI) => {
    try {
      const response = await API.getProducts(productData);

      const {
        data: { data: products },
      } = response;

      console.log(response);

      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);


const addProductToCart = createAsyncThunk(
  `${SLICE_NAME}/add`,
  async ({ productId, quantity }, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;

    console.log("Redux state - user:", user);

    if (!user) {
      console.log("User not authenticated");
      return thunkAPI.rejectWithValue("User not authenticated");
    }
    
    try {
      const response = await API.addProductToCart({ productId, cartId: user.id, quantity });
      const {
        data: { cartProduct },
      } = response.data;
      
      console.log("Sending request to add product to cart:", { productId, cartId: user.cartId, quantity });
      console.log("Product successfully added to cart:", cartProduct);
      return cartProduct;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.errors || "Failed to add product to cart");
    }
  }
);

const productSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addProductToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart.push(action.payload);
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: productsReducer, actions } = productSlice;

export { getProducts, addProductToCart };

export default productsReducer;
