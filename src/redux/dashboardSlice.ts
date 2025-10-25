// store/dashboardSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import DashboardService from "../services/dashboardService";
import type {
  DashboardSummary,
  RevenueStat,
  MonthlyNewUserStat,
  TopCourse,
  RecentOrder,
  RecentReview,
} from "../types/dashboard";
import type { TAny } from "../types/common";

type DashboardState = {
  summary: DashboardSummary | null;
  revenueStats: RevenueStat[];
  monthlyNewUsers: MonthlyNewUserStat[];
  topCourses: TopCourse[];
  recentOrders: RecentOrder[];
  recentReviews: RecentReview[];
  loading: boolean;
  error: string | null;
};

const initialState: DashboardState = {
  summary: null,
  revenueStats: [],
  monthlyNewUsers: [],
  topCourses: [],
  recentOrders: [],
  recentReviews: [],
  loading: false,
  error: null,
};

// ======================== THUNKS ========================
export const fetchDashboardData = createAsyncThunk<
  {
    summary: DashboardSummary;
    revenueStats: RevenueStat[];
    monthlyNewUsers: MonthlyNewUserStat[];
    topCourses: TopCourse[];
    recentOrders: RecentOrder[];
    recentReviews: RecentReview[];
  },
  void,
  { rejectValue: string }
>("dashboard/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const [summary, revenueStats, monthlyNewUsers, topCourses, recentOrders, recentReviews] =
      await Promise.all([
        DashboardService.getSummary(),
        DashboardService.getRevenueStats(),
        DashboardService.getMonthlyNewUsers(),
        DashboardService.getTopCourses(),
        DashboardService.getRecentOrders(),
        DashboardService.getRecentReviews(),
      ]);

    return { summary, revenueStats, monthlyNewUsers, topCourses, recentOrders, recentReviews };
  } catch (err: TAny) {
    console.error("❌ FETCH DASHBOARD ERROR:", err);
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ======================== SLICE ========================
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.summary = null;
      state.revenueStats = [];
      state.monthlyNewUsers = [];
      state.topCourses = [];
      state.recentOrders = [];
      state.recentReviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDashboardData.fulfilled,
        (
          state,
          action: PayloadAction<{
            summary: DashboardSummary;
            revenueStats: RevenueStat[];
            monthlyNewUsers: MonthlyNewUserStat[];
            topCourses: TopCourse[];
            recentOrders: RecentOrder[];
            recentReviews: RecentReview[];
          }>
        ) => {
          state.loading = false;
          state.summary = action.payload.summary;
          state.revenueStats = action.payload.revenueStats;
          state.monthlyNewUsers = action.payload.monthlyNewUsers;
          state.topCourses = action.payload.topCourses;
          state.recentOrders = action.payload.recentOrders;
          state.recentReviews = action.payload.recentReviews;
        }
      )
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
