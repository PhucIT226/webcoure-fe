import { useAppSelector } from "../../../hooks";
import { FaShoppingBag } from "react-icons/fa";
import { FaCheck, FaClock, FaUndo, FaTimes } from "react-icons/fa";

export const RecentOrders = () => {
  const { recentOrders, loading } = useAppSelector((state) => state.dashboard);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaShoppingBag className="text-green-500 text-lg" />
          <h3 className="font-semibold text-gray-800 text-lg">
            Đơn hàng gần đây
          </h3>
        </div>
        <span className="text-xs text-gray-500 italic">
          Cập nhật trong 24h qua
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse">Đang tải...</p>
      ) : recentOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <FaShoppingBag className="text-3xl mb-2 opacity-50" />
          <p className="text-sm">Chưa có đơn hàng nào gần đây</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <li
              key={order.id}
              className="py-3 flex items-center justify-between hover:bg-green-50/40 px-3 rounded-lg transition-all duration-200"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {order.user?.name || "Người dùng ẩn danh"}
                </p>
                <p className="text-xs text-gray-500">Mã đơn: #{order.id}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-600">
                    {Math.ceil(order.totalAmount ?? 0).toLocaleString("vi-VN")}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium
                    ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "refunded"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {order.status === "paid" && <FaCheck />}
                  {order.status === "pending" && <FaClock />}
                  {order.status === "refunded" && <FaUndo />}
                  {order.status === "cancelled" && <FaTimes />}

                  {order.status === "paid"
                    ? "Đã thanh toán"
                    : order.status === "pending"
                    ? "Đang xử lý"
                    : order.status === "refunded"
                    ? "Đã hoàn tiền"
                    : "Đã hủy"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
