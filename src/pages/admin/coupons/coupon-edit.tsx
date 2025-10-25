import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CouponForm from "../../../components/admin/coupons/CouponForm";
import CouponService from "../../../services/couponService";
import type { Coupon } from "../../../types/coupon";

export default function CouponEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CouponService.getById(id!);
        setCoupon(res);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy coupon");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data: Partial<Coupon>) => {
    try {
      await CouponService.update(id!, data);
      alert("Cập nhật coupon thành công!");
      navigate("/admin/coupons");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật coupon");
    }
  };

  if (!coupon) return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-4">
        Chỉnh sửa mã giảm giá
      </h1>
      <CouponForm initialData={coupon} onSubmit={handleUpdate} />
    </div>
  );
}
