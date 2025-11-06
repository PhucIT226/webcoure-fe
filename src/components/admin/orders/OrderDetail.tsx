import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../services/axiosClient";
import type { Order } from "../../../types/order";
import {
  FaUser,
  FaEnvelope,
  FaMoneyBillAlt,
  FaCreditCard,
  FaCalendarAlt,
  FaClipboardList,
  FaArrowLeft,
  FaInfoCircle,
} from "react-icons/fa";

export default function OrderDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/orders/${id}`)
        .then((res) => {
          console.log("🧩 Kết quả từ backend:", res.data);
          setOrder(res.data.data);
        })
        .catch((err) => {
          console.error("❌ Lỗi khi fetch order:", err);
          setOrder(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Không tìm thấy dữ liệu đơn hàng
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
          Chi tiết đơn hàng
        </h1>
      </div>

      {/* Card chính */}
      <div className="p-8 rounded-3xl shadow-xl space-y-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        {/* Mã & khách hàng */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center">
            Mã đơn hàng: {order.id}
          </h2>
        </div>

        {/* Tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
                <FaUser className="mr-3 text-blue-500 text-lg" />
                Khách hàng:{" "}
                <span className="font-semibold text-gray-900 ml-1">
                {order.user?.name || "Ẩn danh"}
                </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
                <FaEnvelope className="mr-3 text-yellow-500 text-lg" />
                Email:{" "}
                <span className="font-semibold text-gray-900 ml-1">
                {order.user?.email || "Không có"}
                </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaMoneyBillAlt className="mr-3 text-green-500 text-lg" />
              Tổng tiền:{" "}
              <span className="text-xl font-bold ml-1">
                {Number(order.totalAmount).toLocaleString("vi-VN")} đ
              </span>
            </p>

            <p className="flex items-center text-gray-800 font-medium">
              <FaCreditCard className="mr-3 text-indigo-500 text-lg" />
              Phương thức thanh toán:{" "}
              <span className="ml-1 capitalize">
                {order.paymentMethod || "Không xác định"}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaInfoCircle className="mr-3 text-purple-500 text-lg" />
              Trạng thái thanh toán:{" "}
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus === "unpaid"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.paymentStatus === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {order.paymentStatus}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaClipboardList className="mr-3 text-pink-500 text-lg" />
              Trạng thái đơn hàng:{" "}
              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </p>

            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-indigo-500 text-lg" />
              Ngày tạo:{" "}
              {new Date(order.createdAt || "").toLocaleDateString("vi-VN")}
            </p>

            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-purple-500 text-lg" />
              Cập nhật gần nhất:{" "}
              {new Date(order.updatedAt || "").toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Danh sách khóa học trong đơn hàng */}
        {order.items && order.items.length > 0 && (
          <div className="mt-8">
            <p className="font-semibold mb-3 text-gray-800 text-lg">
              Khóa học trong đơn hàng:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-base-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.course?.thumbnailUrl && (
                    <img
                      src={`http://localhost:3000${item.course.thumbnailUrl}`}
                      alt={item.course.title}
                      className="w-24 h-20 object-cover rounded-lg border border-gray-200"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.course?.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Giá:{" "}
                      {Number(item.price).toLocaleString("vi-VN")} đ
                      {item.discount
                        ? ` (-${item.discount}%)`
                        : ""}
                    </p>
                    <p className="text-sm text-gray-600">
                      Trạng thái truy cập:{" "}
                      <span
                        className={`ml-1 font-semibold ${
                          item.accessStatus === "active"
                            ? "text-green-600"
                            : item.accessStatus === "expired"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      >
                        {item.accessStatus}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ghi chú */}
        {order.note && (
          <div className="mt-8">
            <p className="font-semibold mb-2 text-gray-800 text-lg">Ghi chú:</p>
            <p className="bg-base-100 p-4 rounded-lg border border-gray-200 shadow-sm text-gray-700">
              {order.note}
            </p>
          </div>
        )}
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
