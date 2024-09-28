import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "products";

let initialState = {
  products: [],
  product: null,
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

const getProductById = createAsyncThunk(
  `${SLICE_NAME}/getProductById`,
  async (productId, thunkAPI) => {
    try {
      const response = await API.getProductById(productId);

      const {
        data: { data: product },
      } = response;

      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }

)

const getProductsDesc = createAsyncThunk(
  `${SLICE_NAME}/getDesc`,
  async (productData, thunkAPI) => {
    try {
      const response = await API.getProductsDesc(productData);

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
      const response = await API.addProductToCart({
        productId,
        cartId: user.id,
        quantity,
      });
      const {
        data: {
          data: { cartProduct },
        },
      } = response;

      console.log("Sending request to add product to cart:", {
        productId,
        cartId: user.cartId,
        quantity,
      });
      console.log("Product successfully added to cart:", cartProduct);
      return cartProduct;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || "Failed to add product to cart"
      );
    }
  }
);

const productSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
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
    builder.addCase(getProductsDesc.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsDesc.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsDesc.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

  },
});

const { reducer: productsReducer, actions } = productSlice;

export { getProducts, addProductToCart, getProductsDesc, getProductById };

export default productsReducer;
