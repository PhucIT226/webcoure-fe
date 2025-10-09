import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginForm, UserRes } from "../types/auth";
import { authService } from "../services/authService";

type AuthState = {
  isAuthenticated: boolean | null;
  user: UserRes | null;
  refreshToken?: string;
  accessToken?: string;
  loading: boolean;
  error: string | null;
};
const initialState: AuthState = {
  isAuthenticated: null,
  user: null,
  loading: false,
  error: null,
};

export const signin = createAsyncThunk(
  "auth/signin", // type
  async (payload: LoginForm, { rejectWithValue }) => {
    try {
      const response = await authService.signin(payload);
      return response;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);
export const signout = createAsyncThunk(
  "auth/signout", // type
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.signout();
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });
  },
});

export default authSlice.reducer;
