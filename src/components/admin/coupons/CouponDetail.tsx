import { useLocation, useNavigate } from "react-router-dom";
import type { Coupon } from "../../../types/coupon";
import {
  FaKey,
  FaPercent,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaAlgolia,
  FaArrowLeft,
} from "react-icons/fa";

export default function CouponDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const coupon = location.state?.coupon as Coupon | undefined;

  if (!coupon) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Không tìm thấy dữ liệu mã giảm giá.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-600 tracking-wide">
          Chi tiết mã giảm giá
        </h1>
      </div>

      {/* Card chính */}
      <div className="p-8 rounded-3xl shadow-xl space-y-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        {/* Code & description */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">{coupon.code}</h2>
          {coupon.description && (
            <p className="text-gray-700 leading-relaxed text-lg">{coupon.description}</p>
          )}
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Cột trái */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaKey className="mr-3 text-yellow-500 text-lg" />
              ID: {coupon.id}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaPercent className="mr-3 text-purple-500 text-lg" />
              Loại giảm giá: {coupon.discountType === "percentage" ? "Phần trăm" : "Cố định"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaMoneyBillWave className="mr-3 text-green-500 text-lg" />
              Giá trị giảm: {coupon.value} {coupon.discountType === "percentage" ? "%" : "đ"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaKey className="mr-3 text-blue-500 text-lg" />
              Số lần đã dùng: {coupon.usageCount ?? 0}/{coupon.maxUsage ?? "∞"}
            </p>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
                <FaAlgolia className="mr-3 text-pink-500 text-lg" />
                Trạng thái:
                <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    coupon.status === "active"
                    ? "bg-green-100 text-green-700"
                    : coupon.status === "inactive"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
                >
                {coupon.status}
                </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-indigo-500 text-lg" />
              Bắt đầu: {coupon.validFrom ? new Date(coupon.validFrom).toLocaleDateString("vi-VN") : "-"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-purple-500 text-lg" />
              Kết thúc: {coupon.validTo ? new Date(coupon.validTo).toLocaleDateString("vi-VN") : "-"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaMoneyBillWave className="mr-3 text-green-500 text-lg" />
              Giá trị tối thiểu đơn hàng: {coupon.minOrderValue ?? 0} đ
            </p>
          </div>
        </div>
      </div>

      {/* Button quay lại */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 
            hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg 
            shadow-lg transition-all duration-300 font-medium"
        >
          <FaArrowLeft className="text-lg" />
          Quay lại
        </button>
      </div>
    </div>
  );
}
