import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPayment } from "../services/paymentService";
import type { TAny } from "../types/common";

interface PaymentState {
  clientSecret: string | null;
  orderId: string | null;
  loading: boolean;
  error: string | null;
}

export interface PaymentPayload {
  courseId: string | string[];
  userId: string;
  orderId?: string;
}

const initialState: PaymentState = {
  clientSecret: null,
  orderId: null,
  loading: false,
  error: null,
};

export const createPaymentIntent = createAsyncThunk<
  { clientSecret: string; orderId: string },
  PaymentPayload,
  { rejectValue: string }
>("payment/createPaymentIntent", async (payload, { rejectWithValue }) => {
  try {
    const data = await createPayment(payload);
    console.log("💾 createPaymentIntent response:", data);
    return {
      clientSecret: data.clientSecret,
      orderId: data.orderId,
    };
  } catch (err: TAny) {
    return rejectWithValue(err?.message || "Something went wrong");
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.clientSecret; // ✅ không ghi đè
        state.orderId = action.payload.orderId;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export default paymentSlice.reducer;
