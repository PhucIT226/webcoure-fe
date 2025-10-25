import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import CouponService from "../services/couponService";
import type { Coupon, CouponResDto, GetAllCouponParams } from "../types/coupon";
import type { TAny } from "../types/common";

type CouponState = {
  data: Coupon[];
  pagination: CouponResDto["pagination"] | null;
  loading: boolean;
  error: string | null;
};

const initialState: CouponState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

// ======================== THUNKS ========================
export const fetchCoupons = createAsyncThunk<
  CouponResDto,
  GetAllCouponParams | undefined,
  { rejectValue: string }
>("coupons/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await CouponService.getAll(params);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchCouponById = createAsyncThunk<
  Coupon,
  string,
  { rejectValue: string }
>("coupons/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await CouponService.getById(id);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createCoupon = createAsyncThunk<
  Coupon,
  Partial<Coupon>,
  { rejectValue: string }
>("coupons/create", async (coupon, { rejectWithValue }) => {
  try {
    return await CouponService.create(coupon);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateCoupon = createAsyncThunk<
  Coupon,
  { id: string; coupon: Partial<Coupon> },
  { rejectValue: string }
>("coupons/update", async ({ id, coupon }, { rejectWithValue }) => {
  try {
    return await CouponService.update(id, coupon);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteCoupon = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("coupons/delete", async (id, { rejectWithValue }) => {
  try {
    await CouponService.delete(id);
    return id;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ======================== SLICE ========================
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    clearCoupons: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCoupons.fulfilled,
        (state, action: PayloadAction<CouponResDto>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchCouponById.fulfilled,
        (state, action: PayloadAction<Coupon>) => {
          const existing = state.data.find((c) => c.id === action.payload.id);
          if (!existing) state.data.push(action.payload);
        }
      )
      .addCase(
        createCoupon.fulfilled,
        (state, action: PayloadAction<Coupon>) => {
          state.data.push(action.payload);
        }
      )
      .addCase(
        updateCoupon.fulfilled,
        (state, action: PayloadAction<Coupon>) => {
          const index = state.data.findIndex((c) => c.id === action.payload.id);
          if (index !== -1) state.data[index] = action.payload;
        }
      )
      .addCase(
        deleteCoupon.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((c) => c.id !== action.payload);
        }
      );
  },
});

export const { clearCoupons } = couponSlice.actions;
export default couponSlice.reducer;
