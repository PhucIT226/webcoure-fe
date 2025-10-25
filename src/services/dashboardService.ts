// services/dashboardService.ts
import axios from "./axiosClient";
import type {
  DashboardSummary,
  RevenueStat,
  MonthlyNewUserStat,
  TopCourse,
  RecentOrder,
  RecentReview,
} from "../types/dashboard";

const DashboardService = {
  // 🧠 Lấy tổng quan
  async getSummary(): Promise<DashboardSummary> {
    const res = await axios.get("/dashboard/summary");
    return res.data.data;
  },

  // 📈 Lấy thống kê doanh thu
  async getRevenueStats(): Promise<RevenueStat[]> {
    const res = await axios.get("/dashboard/revenue");
    return res.data.data;
  },

  // 👥 Lấy số lượng học viên đăng ký theo tháng
  async getMonthlyNewUsers(): Promise<MonthlyNewUserStat[]> {
    const res = await axios.get("/dashboard/monthly-new-users");
    return res.data.data;
  },

  // 🔥 Lấy top khóa học
  async getTopCourses(limit = 5): Promise<TopCourse[]> {
    const res = await axios.get(`/dashboard/top-courses?limit=${limit}`);
    return res.data.data;
  },

  // 🛒 Lấy đơn hàng gần đây
  async getRecentOrders(limit = 5): Promise<RecentOrder[]> {
    const res = await axios.get(`/dashboard/recent-orders?limit=${limit}`);
    return res.data.data;
  },

  // ⭐ Lấy đánh giá gần đây
  async getRecentReviews(limit = 5): Promise<RecentReview[]> {
    const res = await axios.get(`/dashboard/recent-reviews?limit=${limit}`);
    return res.data.data;
  },
};

export default DashboardService;
