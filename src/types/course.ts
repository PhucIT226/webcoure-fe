import type { Image, Pagination } from "./common";

export type Course = {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  instructor: {name: string, email: string};
  category: { name: string };
  price: number;
  studentCount?: number;
  createdAt?: string;
  updatedAt?: string;
  status: "published" | "draft" | "closed";
  thumbnailUrls?: Image[];
};

export interface CourseResDto {
  data: Course[];
  pagination: Pagination;
}

export type GetAllCourseParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};
