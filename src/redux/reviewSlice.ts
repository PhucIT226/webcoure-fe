import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import ReviewService from "../services/reviewService";
import type { Review, ReviewResDto, GetAllReviewParams } from "../types/review";
import type { TAny } from "../types/common";

type ReviewState = {
  data: Review[];
  pagination: ReviewResDto["pagination"] | null;
  loading: boolean;
  error: string | null;
};

const initialState: ReviewState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

// ======================== THUNKS ========================

// Lấy tất cả review với filter, search, pagination
export const fetchReviews = createAsyncThunk<
  ReviewResDto,
  GetAllReviewParams | undefined,
  { rejectValue: string }
>("reviews/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await ReviewService.getAll(params);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Lấy chi tiết review theo ID
export const fetchReviewById = createAsyncThunk<
  Review,
  string,
  { rejectValue: string }
>("reviews/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await ReviewService.getById(id);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Tạo review mới
export const createReview = createAsyncThunk<
  Review,
  Partial<Review>,
  { rejectValue: string }
>("reviews/create", async (review, { rejectWithValue }) => {
  try {
    return await ReviewService.create(review);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Cập nhật review
export const updateReview = createAsyncThunk<
  Review,
  { id: string; review: Partial<Review> },
  { rejectValue: string }
>("reviews/update", async ({ id, review }, { rejectWithValue }) => {
  try {
    return await ReviewService.update(id, review);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Xóa review
export const deleteReview = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("reviews/delete", async (id, { rejectWithValue }) => {
  try {
    await ReviewService.delete(id);
    return id;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Duyệt review
export const approveReview = createAsyncThunk<
  Review,
  string,
  { rejectValue: string }
>("reviews/approve", async (id, { rejectWithValue }) => {
  try {
    return await ReviewService.approve(id);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ======================== SLICE ========================
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<ReviewResDto>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchReviewById.fulfilled,
        (state, action: PayloadAction<Review>) => {
          const existing = state.data.find((r) => r.id === action.payload.id);
          if (!existing) state.data.push(action.payload);
        }
      )
      .addCase(
        createReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.data.push(action.payload);
        }
      )
      .addCase(
        updateReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          const index = state.data.findIndex((r) => r.id === action.payload.id);
          if (index !== -1) state.data[index] = action.payload;
        }
      )
      .addCase(
        deleteReview.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((r) => r.id !== action.payload);
        }
      )
      .addCase(
        approveReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          const index = state.data.findIndex((r) => r.id === action.payload.id);
          if (index !== -1) state.data[index] = action.payload;
        }
      );
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
