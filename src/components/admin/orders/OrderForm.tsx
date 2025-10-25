import { useState, useEffect } from "react";
import type { Order } from "../../../types/order";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  initialData?: Order | null;
  onSubmit: (data: Partial<Order>) => void;
};

export default function OrderForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();

  const [status, setStatus] = useState<"pending" | "paid" | "cancelled" | "refunded">("pending");
  const [paymentStatus, setPaymentStatus] = useState<"unpaid" | "paid" | "failed" | "refunded">("unpaid");
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "paypal" | "bank" | "momo" | "zalopay" | "">("");
  const [totalAmount, setTotalAmount] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🧩 Nếu đang sửa thì load dữ liệu cũ
  useEffect(() => {
    if (initialData) {
      setStatus(initialData.status || "pending");
      setPaymentStatus(initialData.paymentStatus || "unpaid");
      setPaymentMethod(initialData.paymentMethod || "");
      setTotalAmount(String(initialData.totalAmount || ""));
      setNote(initialData.note || "");
    }
  }, [initialData]);

  // 🧩 Validate
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!totalAmount || isNaN(Number(totalAmount))) {
      newErrors.totalAmount = "Tổng tiền không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🧩 Gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data: Partial<Order> = {
      totalAmount: Number(totalAmount),
      status,
      paymentMethod: paymentMethod || null,
      paymentStatus,
      note: note.trim(),
    };

    onSubmit(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Tổng tiền */}
      <div>
        <label className="font-medium">Tổng tiền (VNĐ)</label>
        <input
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          placeholder="Nhập tổng tiền"
          className="border px-3 py-2 rounded w-full mt-1"
        />
        {errors.totalAmount && <p className="text-red-500 text-sm mt-1">{errors.totalAmount}</p>}
      </div>

      {/* Trạng thái đơn hàng */}
      <div>
        <label className="font-medium">Trạng thái đơn hàng</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="border px-3 py-2 rounded w-full mt-1"
        >
          <option value="pending">Chờ xử lý</option>
          <option value="paid">Đã thanh toán</option>
          <option value="cancelled">Đã hủy</option>
          <option value="refunded">Hoàn tiền</option>
        </select>
      </div>

      {/* Trạng thái thanh toán */}
      <div>
        <label className="font-medium">Trạng thái thanh toán</label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value as typeof paymentStatus)}
          className="border px-3 py-2 rounded w-full mt-1"
        >
          <option value="unpaid">Chưa thanh toán</option>
          <option value="paid">Đã thanh toán</option>
          <option value="failed">Thất bại</option>
          <option value="refunded">Hoàn tiền</option>
        </select>
      </div>

      {/* Phương thức thanh toán */}
      <div>
        <label className="font-medium">Phương thức thanh toán</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
          className="border px-3 py-2 rounded w-full mt-1"
        >
          <option value="">-- Chọn phương thức --</option>
          <option value="credit_card">Thẻ tín dụng</option>
          <option value="paypal">PayPal</option>
          <option value="bank">Chuyển khoản</option>
          <option value="momo">Momo</option>
          <option value="zalopay">ZaloPay</option>
        </select>
      </div>

      {/* Ghi chú */}
      <div>
        <label className="font-medium">Ghi chú</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập ghi chú cho đơn hàng (tuỳ chọn)"
          className="border px-3 py-2 rounded min-h-[80px] w-full mt-1"
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500
            hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg
            shadow-lg transition-all duration-300 font-medium
          "
        >
          <FaArrowLeft className="text-lg" />
          Quay lại
        </button>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg shadow-md font-medium"
        >
          {initialData ? "Cập nhật đơn hàng" : "Tạo đơn hàng"}
        </button>
      </div>
    </form>
  );
}
