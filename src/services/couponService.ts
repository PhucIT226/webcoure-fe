import axios from "../services/axiosClient";
import type { Coupon, CouponResDto, GetAllCouponParams } from "../types/coupon";

const CouponService = {
  // Lấy danh sách coupon (có phân trang, tìm kiếm, sắp xếp, filter trạng thái)
  async getAll(params?: GetAllCouponParams): Promise<CouponResDto> {
    const res = await axios.get<CouponResDto>("/coupons", { params });
    return res.data;
  },

  // Lấy chi tiết coupon theo ID
  async getById(id: string): Promise<Coupon> {
    const res = await axios.get(`/coupons/${id}`);
    return res.data.data;
  },

  // Tạo coupon mới
  async create(coupon: Partial<Coupon>): Promise<Coupon> {
    const res = await axios.post<{ status: boolean; message: string; data: Coupon }>(
      "/coupons",
      coupon
    );
    return res.data.data;
  },

  // Cập nhật coupon
  async update(id: string, coupon: Partial<Coupon>): Promise<Coupon> {
    const res = await axios.patch<{ status: boolean; message: string; data: Coupon }>(
      `/coupons/${id}`,
      coupon
    );
    return res.data.data;
  },

  // Xóa coupon
  async delete(id: string): Promise<void> {
    await axios.delete(`/coupons/${id}`);
  },
};

export default CouponService;
