import axios from "./axiosClient";
import type { Course, CourseResDto, GetAllCourseParams } from "../types/course";

const CourseService = {
  async getAll(params?: GetAllCourseParams): Promise<CourseResDto> {
    const res = await axios.get<CourseResDto>("/courses", { params });
    return res.data;
  },

  async getById(id: string): Promise<Course> {
    const res = await axios.get<Course>(`/courses/${id}`);
    return res.data;
  },

  async create(course: Partial<Course>, files?: File[]): Promise<Course> {
    const formData = new FormData();

    // Thêm dữ liệu text
    Object.entries(course).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // Thêm file (nếu có)
    if (files && files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }

    const res = await axios.post<Course>("/courses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  async update(id: string, course: Partial<Course>, files?: File[]): Promise<Course> {
    const formData = new FormData();

    Object.entries(course).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (files && files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }

    const res = await axios.patch<Course>(`/courses/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/courses/${id}`);
  },
};

export default CourseService;
