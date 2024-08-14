import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "auth";

const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await API.login(userData);

      console.log(user);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const refresh = createAsyncThunk(
  `${SLICE_NAME}/refresh`,
  async (refreshToken, thunkAPI) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await API.refresh(refreshToken);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const registration = createAsyncThunk(
  `${SLICE_NAME}/registration`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: {
          data: { user },
        },
      } = await API.registration(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const initialState = {
  user: {
    id: null,
    name: '',
    email: '',
    cartId: null, // Переконайтеся, що цей атрибут існує
    // інші атрибути користувача
  },
  isLoading: false,
  error: null,
};

const authSlise = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(refresh.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: authReducer, actions } = authSlise;

export const { logout } = actions;

export { login, refresh, registration };

export default authReducer;
