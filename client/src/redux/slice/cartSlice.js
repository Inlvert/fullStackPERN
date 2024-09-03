import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "carts";

let initialState = {
  cart: {
    CartProducts: [],
  },
  totalPrice: 0,
  products: [],
  isLoading: false,
  error: null,
  sendOrder: null,
};

const getCart = createAsyncThunk(
  `${SLICE_NAME}/getCart`,
  async (cartData, thunkAPI) => {
    console.log(cartData);
    try {
      const response = await API.getCart(cartData);

      const {
        data: { data: cart },
      } = response;

      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const getCartTotalPrice = createAsyncThunk(
  `${SLICE_NAME}/sum`,
  async (cartData, thunkAPI) => {
    console.log(cartData);
    try {
      const response = await API.getCartTotal(cartData);

      const {
        data: { data: total },
      } = response;

      return total;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const deleteProductFromCP = createAsyncThunk(
  `${SLICE_NAME}/delete`,
  async (cartProductId, thunkAPI) => {
    try {
      const response = await API.deleteProductFromCP(cartProductId);
      const {
        data: { data: foundCartProduct },
      } = response;

      return foundCartProduct;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const sendOnMail = createAsyncThunk(
  `${SLICE_NAME}/send`,
  async (cartId, thunkAPI) => {
    try {
      const response = await API.sendOnMail(cartId);

      const {
        data: { data: cart },
      } = response;

      return cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const cartSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getCartTotalPrice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartTotalPrice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalPrice = action.payload;
    });
    builder.addCase(getCartTotalPrice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProductFromCP.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProductFromCP.fulfilled, (state, action) => {
      state.isLoading = true;

      // Recalculate the total price after deletion
      state.totalPrice -=
        action.payload.Product.price * action.payload.quantity;

      // Remove the product from the list
      state.cart.CartProducts = state.cart.CartProducts.filter(
        (product) => product.id !== action.payload.id
      );
    });
    builder.addCase(deleteProductFromCP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(sendOnMail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendOnMail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sendOrder = action.payload;
      state.cart.CartProducts = []; // Очищення кошика після успішного замовлення
      state.totalPrice = 0;
    });
    builder.addCase(sendOnMail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

const { reducer: cartReducer, actions } = cartSlice;

export const { clearCart } = actions;

export { getCart, getCartTotalPrice, deleteProductFromCP, sendOnMail};

export default cartReducer;
