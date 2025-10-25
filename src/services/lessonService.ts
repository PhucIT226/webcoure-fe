// src/services/lesson.service.ts
import axios from "./axiosClient";
import type { Lesson, ApiResponse } from "../types/lesson";

const LessonService = {
  // GET /api/lessons?page=&pageSize=&courseId=
  async getLessons(params?: {
    page?: number;
    pageSize?: number;
    courseId?: string;
  }) {
    const res = await axios.get<ApiResponse<Lesson[]>>("/lessons", { params });
    return res.data;
  },

  // GET /api/lessons/:id
  async getLessonById(id: string) {
    const res = await axios.get<ApiResponse<Lesson>>(`/lessons/${id}`);
    return res.data;
  },

  // POST /api/lessons
  async createLesson(data: Partial<Lesson>) {
    const res = await axios.post<ApiResponse<Lesson>>("/lessons", data);
    return res.data;
  },

  // PUT /api/lessons/:id
  async updateLesson(id: string, data: Partial<Lesson>) {
    const res = await axios.put<ApiResponse<Lesson>>(`/lessons/${id}`, data);
    return res.data;
  },

  // DELETE /api/lessons/:id
  async deleteLesson(id: string) {
    const res = await axios.delete<ApiResponse<null>>(`/lessons/${id}`);
    return res.data;
  },
};

export default LessonService;