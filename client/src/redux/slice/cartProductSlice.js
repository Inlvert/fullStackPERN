import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "cart-products";

let initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const deleteAllProductFromCart = createAsyncThunk(
  `${SLICE_NAME}/delete`,
  async (cartId, thunkAPI) => {
    try {
      const response = await API.deleteAllProductsFromCart(cartId);

      const {
        data: {
          data: { foundCartProducts },
        },
      } = response;

      return foundCartProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const updateQuantity = createAsyncThunk(
  `${SLICE_NAME}/update`,
  async ({ cartProductId, quantity }, thunkAPI) => {
    try {
      const response = await API.updateQuantityProduct(cartProductId, quantity);

      const {
        data: {
          data: { foundCartProduct },
        },
      } = response;

      return foundCartProduct
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const cartProductSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteAllProductFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAllProductFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(deleteAllProductFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateQuantity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      // state.isLoading = false;
      // const updatedProduct = action.payload;
      // state.products = state.products.map((product) =>
      //   product.id === updatedProduct.id ? updatedProduct : product
      // );
      state.isLoading = false;

      // Оновлюємо конкретний товар у списку
      const index = state.products.findIndex(
        (product) => product.id === action.payload.cartProductId
      );
      if (index !== -1) {
        state.products[index].quantity = action.payload.quantity;
      }
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: cartProductReducer, actions } = cartProductSlice;

export { deleteAllProductFromCart, updateQuantity };

export default cartProductReducer;
