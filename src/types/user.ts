import type { Image, Pagination } from "./common";

export type User = {
  id?: string;
  roleId?: string;
  role?: {
    id: string;
    name: string;
  };
  name: string;
  email: string;
  password?: string;
  profile?: {
    fullName?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
  };
  enrollments?: {
    id: string;
    course?: {
      id: string;
      title: string;
    };
  }[];
  courses?: {
    id: string;
    title: string;
  }[];
  progress?: string; 
  status: "active" | "inactive" | "banned" | "pending";
  createdAt?: string;
  updatedAt?: string;
  avatarUrl?: string;
  avatarUrls?: Image[];
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
  role?: "student" | "instructor";
};
