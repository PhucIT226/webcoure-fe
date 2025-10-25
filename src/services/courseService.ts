import axios from "./axiosClient";
import type { Course, CourseResDto, GetAllCourseParams } from "../types/course";

const CourseService = {
  // Lấy danh sách khóa học (có phân trang, tìm kiếm, sắp xếp)
  async getAll(params?: GetAllCourseParams): Promise<CourseResDto> {
    const res = await axios.get<CourseResDto>("/courses", { params });
    return res.data;
  },

  // Lấy chi tiết khóa học theo ID
  async getById(id: string): Promise<Course> {
    const res = await axios.get(`/courses/${id}`);
    return res.data.data;
  },

  // Tạo khóa học mới
  async create(course: Partial<Course>, files?: File[]): Promise<Course> {
    const formData = new FormData();

    // ✅ Append dữ liệu text
    Object.entries(course).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // ✅ Thêm file thumbnail (nếu có)
    if (files && files.length > 0) {
      formData.append("thumbnail", files[0]); // key phải trùng với backend multer.single("thumbnail")
    }

    // ✅ Gửi request
    const res = await axios.post<Course>("/courses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  // Cập nhật khóa học
  async update(
    id: string,
    course: Partial<Course>,
    files?: File[]
  ): Promise<Course> {
    const formData = new FormData();

    Object.entries(course).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // ✅ Nếu có ảnh mới thì thêm thumbnail
    if (files && files.length > 0) {
      formData.append("thumbnail", files[0]);
    }

    const res = await axios.patch<{
      status: boolean;
      message: string;
      data: Course;
    }>(`/courses/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },

  // Xóa khóa học
  async delete(id: string): Promise<void> {
    await axios.delete(`/courses/${id}`);
  },

  // ✅ Lấy danh mục (để hiển thị trong select box)
  async getCategories() {
    const res = await axios.get("/categories");
    return res.data;
  },

  // ✅ Lấy danh sách giảng viên
  async getInstructors() {
    const res = await axios.get("/users?role=instructor");
    return res.data;
  },
};

export default CourseService;
