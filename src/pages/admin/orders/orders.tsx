import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchOrders, deleteOrder } from "../../../redux/orderSlice";
import type { Order } from "../../../types/order";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: orders, pagination, loading, error } = useAppSelector(
    (state) => state.order
  );

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 🧩 Lấy danh sách đơn hàng
  useEffect(() => {
    dispatch(
      fetchOrders({
        page,
        pageSize: 15,
        search,
        sortField,
        sortOrder,
      })
    );
  }, [dispatch, page, search, sortField, sortOrder]);

  // 🧩 Xóa đơn hàng
  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      dispatch(deleteOrder(id));
    }
  };

  // 🧩 Tìm kiếm
  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  // 🧩 Sắp xếp
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="p-6">
      {/* Header + Search */}
      <div className="sticky top-16 z-20 p-4 my-4 bg-yellow-700 shadow-lg rounded-sm bg-base-100">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Quản lý đơn hàng</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm đơn hàng..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border bg-base-100 px-3 py-2 rounded-md text-sm text-base-content"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 
                         hover:from-indigo-600 hover:to-purple-600
                         text-white px-4 py-2 rounded-md text-sm"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="whitespace-nowrap bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="border text-center px-4 py-3">STT</th>
              <th className="border text-center px-4 py-3">Khách hàng</th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("totalAmount")}
              >
                Tổng tiền {renderSortIcon("totalAmount")}
              </th>
              <th className="border text-center px-4 py-3">Phương thức</th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("paymentStatus")}
              >
                Thanh toán {renderSortIcon("paymentStatus")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Trạng thái {renderSortIcon("status")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Ngày tạo {renderSortIcon("createdAt")}
              </th>
              <th className="border text-center px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: Order, index: number) => (
                <tr
                  key={order.id}
                  className="border-b whitespace-nowrap hover:bg-amber-700 transition-colors"
                >
                  <td className="border text-center px-4 py-2">
                    {(page - 1) * (pagination?.pageSize ?? 15) + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-medium">
                    {order.user?.name || "Ẩn danh"}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {Number(order.totalAmount).toLocaleString("vi-VN")} đ
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {order.paymentMethod || "—"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
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
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border text-center px-4 py-2">
                    {new Date(order.createdAt || "").toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-4 py-2 text-center flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/orders/${order.id}`, { state: { order } })
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}/edit`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(order.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded ${
                  page === p ? "bg-blue-500 text-white" : ""
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
