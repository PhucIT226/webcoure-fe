import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginForm, UserRes } from "../types/auth";
import { authService } from "../services/authService";

type AuthState = {
  isAuthenticated: boolean | null;
  user: UserRes | null;
  accessToken?: string;
  loading: boolean;
  error: string | null;
  verifyStatus: "idle" | "loading" | "success" | "error";
  verifyMessage: string;
};

const initialState: AuthState = {
  isAuthenticated: null,
  user: null,
  accessToken: undefined,
  loading: false,
  error: null,
  verifyStatus: "idle",
  verifyMessage: "",
};

// 🔹 Đăng nhập
export const signin = createAsyncThunk(
  "auth/signin",
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

// 🔹 Đăng xuất
export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.signout();
      return response;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

// 🔹 Xác minh email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      // gọi API verify email (gộp chung service)
      const response = await authService.verifyEmail(token);
      return response.message || "Email xác minh thành công!";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message ||
            "Liên kết không hợp lệ hoặc đã hết hạn!"
        );
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetVerify(state) {
      state.verifyStatus = "idle";
      state.verifyMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // =============== SIGNIN ===============
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload?.accessToken;
        state.user = action.payload.user || null;

        // ✅ Lưu token vào localStorage
        localStorage.setItem(
          "me",
          JSON.stringify({ 
            accessToken: action.payload.accessToken,
          })
        );
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =============== SIGNOUT ===============
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = undefined;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // =============== VERIFY EMAIL ===============
      .addCase(verifyEmail.pending, (state) => {
        state.verifyStatus = "loading";
        state.verifyMessage = "";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyStatus = "success";
        state.verifyMessage = action.payload as string;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyStatus = "error";
        state.verifyMessage =
          (action.payload as string) ||
          "Liên kết không hợp lệ hoặc đã hết hạn!";
      });
  },
});

export const { resetVerify } = authSlice.actions;
export default authSlice.reducer;
