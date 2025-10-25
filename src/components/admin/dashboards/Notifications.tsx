import { useAppSelector } from "../../../hooks";
import { FaBell, FaShoppingCart, FaCommentDots } from "react-icons/fa";

export const Notifications = () => {
  const { recentReviews, recentOrders } = useAppSelector(
    (state) => state.dashboard
  );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaBell className="text-yellow-500 text-lg animate-pulse" />
          <h3 className="font-semibold text-gray-800 text-lg">Thông báo mới</h3>
        </div>
        <span className="text-xs text-gray-500 italic">Cập nhật gần đây</span>
      </div>

      {/* List */}
      <ul className="space-y-3 text-sm">
        <li className="flex items-center gap-3 bg-gray-200 border border-gray-100 rounded-xl p-3 hover:bg-yellow-50 transition-all duration-200">
          <div className="p-2 bg-yellow-100 rounded-full">
            <FaShoppingCart className="text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-800 font-medium">
              {recentOrders.length} đơn hàng mới gần đây
            </p>
            <span className="text-gray-500 text-xs">Kiểm tra danh sách đơn</span>
          </div>
        </li>

        <li className="flex items-center gap-3 bg-gray-200 border border-gray-100 rounded-xl p-3 hover:bg-blue-50 transition-all duration-200">
          <div className="p-2 bg-blue-100 rounded-full">
            <FaCommentDots className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-800 font-medium">
              {recentReviews.length} đánh giá mới được thêm
            </p>
            <span className="text-gray-500 text-xs">Xem chi tiết phản hồi</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
