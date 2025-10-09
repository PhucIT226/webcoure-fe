import type { Pagination } from "./common";

export type OrderStatus = "pending" | "paid" | "cancelled" | "refunded";
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";
export type PaymentMethod = "credit_card" | "paypal" | "bank" | "momo" | "zalopay";
export type AccessStatus = "active" | "expired" | "revoked";

export type OrderItem = {
  id?: string;
  orderId?: string;
  courseId: string;
  price: number;
  discount?: number;
  finalPrice?: number;
  accessStatus?: AccessStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type Order = {
  id?: string;
  userId?: string;
  user?: { id: string; name: string };
  couponId?: string | null;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod | null;
  paymentStatus?: PaymentStatus;
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
