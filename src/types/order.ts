import type { Pagination } from "./common";

export type OrderItem = {
  id?: string;
  orderId?: string;
  courseId: string;
  course?: {
    id: string;
    title: string;
    thumbnailUrl?: string;
  };
  price: number;
  discount?: number;
  finalPrice?: number;
  accessStatus?: "active" | "expired" | "revoked";
  createdAt?: string;
  updatedAt?: string;
};

export type Order = {
  id?: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    email?: string;
  };
  couponId?: string | null;
  totalAmount: number;
  status: "pending" | "paid" | "cancelled" | "refunded";
  paymentMethod?: "credit_card" | "paypal" | "bank" | "momo" | "zalopay" | null;
  paymentStatus?: "unpaid" | "paid" | "failed" | "refunded";
  note?: string | null;
  createdAt?: string;
  updatedAt?: string;
  items?: OrderItem[];
};

export interface OrderResDto {
  data: Order[];
  pagination: Pagination;
}

export type GetAllOrderParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};
