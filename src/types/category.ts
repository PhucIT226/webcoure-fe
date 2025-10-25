import type { Pagination } from "./common";

export type Category = {
  id?: string;
  name: string;
  slug: string;
  courseCount?: number;
  description?: string;
  status: "active" | "hidden";
  createdAt?: string;
  updatedAt?: string;
};

export interface CategoryResDto {
  data: Category[];
  pagination: Pagination;
}

export type GetAllCategoryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};
