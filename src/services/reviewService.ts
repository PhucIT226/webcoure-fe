import axios from "./axiosClient";
import type { Review, ReviewResDto, GetAllReviewParams } from "../types/review";

const ReviewService = {
  // Lấy danh sách review (có phân trang, tìm kiếm, sắp xếp, lọc trạng thái)
  async getAll(params?: GetAllReviewParams): Promise<ReviewResDto> {
    const res = await axios.get<ReviewResDto>("/reviews", { params });
    return res.data;
  },

  // Lấy chi tiết review theo ID
  async getById(id: string): Promise<Review> {
    const res = await axios.get(`/reviews/${id}`);
    return res.data.data;
  },

  // Tạo review mới
  async create(review: Partial<Review>): Promise<Review> {
    const res = await axios.post<{ status: boolean; message: string; data: Review }>(
      "/reviews",
      review
    );
    return res.data.data;
  },

  // Cập nhật review (có thể dùng để sửa comment hoặc rating)
  async update(id: string, review: Partial<Review>): Promise<Review> {
    const res = await axios.patch<{ status: boolean; message: string; data: Review }>(
      `/reviews/${id}`,
      review
    );
    return res.data.data;
  },

  // Xóa review
  async delete(id: string): Promise<void> {
    await axios.delete(`/reviews/${id}`);
  },

  // Duyệt review (thay đổi status thành "approved")
  async approve(id: string): Promise<Review> {
    const res = await axios.patch<{ status: boolean; message: string; data: Review }>(
      `/reviews/${id}/approve`
    );
    return res.data.data;
  },
};

export default ReviewService;
