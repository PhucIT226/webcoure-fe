import type { Pagination } from "./common";

export type Review = {
  id?: string;
  user: { id?: string; name: string };
  userId?: string;
  course: { id?: string; title: string };
  courseId: string;
  rating: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
  status: "pending" | "approved" | "rejected";
};

export interface ReviewResDto {
  data: Review[];
  pagination: Pagination;
}

export type GetAllReviewParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  status?: "pending" | "approved" | "rejected";
};
