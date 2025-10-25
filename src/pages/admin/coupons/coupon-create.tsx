import { useNavigate } from "react-router-dom";
import CouponForm from "../../../components/admin/coupons/CouponForm";
import CouponService from "../../../services/couponService";

export default function CouponCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    try {
      await CouponService.create(data);
      alert("Thêm coupon thành công!");
      navigate("/admin/coupons");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm coupon");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-6 py-4">
        Thêm mã giảm giá mới
      </h1>
      <CouponForm onSubmit={handleCreate} />
    </div>
  );
}
