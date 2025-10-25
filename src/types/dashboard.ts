export type DashboardSummary = {
  totalUsers: number;
  totalCourses: number;
  totalOrders: number;
  totalRevenue: number;
};

export type RevenueStat = {
  month: string;
  totalRevenue: number;
};

export type MonthlyNewUserStat = {
  month: string;
  totalUsers: number;
};

export type TopCourse = {
  id: string;
  title: string;
  price: number;
  thumbnailUrl: string;
  salesCount: number;
};

export type RecentOrder = {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type RecentReview = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { id: string; name: string };
  course: { id: string; title: string };
};

// Tổng hợp data dashboard (nếu muốn gọi 1 lần)
export type DashboardData = {
  summary: DashboardSummary;
  revenueStats: RevenueStat[];
  monthlyNewUsers: MonthlyNewUserStat[];
  topCourses: TopCourse[];
  recentOrders: RecentOrder[];
  recentReviews: RecentReview[];
};

export type VisibleSections = {
  summary: boolean;
  chart: boolean;
  topCourses: boolean;
  orders: boolean;
  reviews: boolean;
  notifications: boolean;
};