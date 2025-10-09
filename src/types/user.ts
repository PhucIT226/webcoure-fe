import type { Pagination } from "./common";

export type User = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  courseCount?: number; // số khóa học đã tham gia
  progress?: string; // tiến độ học tập (vd: "50%", "Đã hoàn thành", ...)
  status: "active" | "inactive" | "banned"; // trạng thái tài khoản
  createdAt?: string;
};

export interface UserResDto {
  data: User[];
  pagination: Pagination;
}

export type GetAllUserParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};
