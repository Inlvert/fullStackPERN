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
  },
});

const { reducer: cartProductReducer, actions } = cartProductSlice;

export { deleteAllProductFromCart };

export default cartProductReducer;
