import type { Course } from "./course";

export type OrderItem = {
  id: string;
  finalPrice: number;
  accessStatus: "active" | "expired" | "revoked";
  createdAt: string;
  updatedAt: string;
  course: Course;
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status?: "pending" | "paid" | "failed";
  paymentStatus?: "pending" | "paid" | "failed";
  items: OrderItem[];
};

export type Profile = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  address?: string;
  avatarUrl?: string;
  role?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;

  // 🧠 Thêm danh sách đơn hàng (khóa học đã mua)
  orders?: Order[];
};

// ✅ Response từ API /profile/me
export interface ProfileResDto {
  status: boolean;
  message: string;
  data: Profile;
}
