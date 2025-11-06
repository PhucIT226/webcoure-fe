import type { Pagination } from "./common";

export type Course = {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  instructor: { id?: string; name: string };
  instructorId?: string;
  category: { id?: string; name: string };
  categoryId: string;
  lessons?: {
    id: string;
    title: string;
    order?: number;
  }[];
  price: number;
  studentCount?: number;
  createdAt?: string;
  updatedAt?: string;
  status: "published" | "draft" | "closed";
  thumbnailUrl?: string;
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
