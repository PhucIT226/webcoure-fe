import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchCoupons, deleteCoupon } from "../../../redux/couponSlice";
import type { Coupon } from "../../../types/coupon";
import { useNavigate } from "react-router-dom";

export default function CouponList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: coupons, pagination, loading, error } = useAppSelector(
    (state) => state.coupon
  );

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "expired" | "">("");

  useEffect(() => {
    dispatch(
      fetchCoupons({
        page,
        pageSize: 15,
        search,
        sortField,
        sortOrder,
        status: statusFilter || undefined,
      })
    );
  }, [dispatch, page, search, sortField, sortOrder, statusFilter]);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa coupon này?")) {
      dispatch(deleteCoupon(id));
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

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
      {/* Header + Search + Status Filter */}
      <div className="sticky top-16 z-20 p-4 my-4 bg-yellow-700 shadow-lg rounded-sm text-white flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-xl font-bold">Quản lý mã giảm giá</h1>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Tìm coupon..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border bg-base-100 px-3 py-2 rounded-md text-sm text-base-content"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Tìm kiếm
          </button>
          <select
            value={statusFilter}
            onChange={(e) => { setPage(1); setStatusFilter(e.target.value as any); }}
            className="
              border border-gray-300 bg-base-100 px-4 py-2 rounded-lg text-sm text-base-content
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
              shadow-sm hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/coupons/create")}
          className="bg-green-600 hover:bg-green-700 text-lg text-white px-4 py-2 rounded-md text-sm"
        >
          Thêm mã giảm giá
        </button>
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
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("code")}>
                Mã coupon {renderSortIcon("code")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("discountType")}>
                Loại giảm giá {renderSortIcon("discountType")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("value")}>
                Giá trị {renderSortIcon("value")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("minOrderValue")}>
                Giá trị tối thiểu {renderSortIcon("minOrderValue")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("status")}>
                Trạng thái {renderSortIcon("status")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("validFrom")}>
                Bắt đầu {renderSortIcon("validFrom")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("validTo")}>
                Kết thúc {renderSortIcon("validTo")}
              </th>
              <th className="border text-center px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon: Coupon, index: number) => (
                <tr key={coupon.id} className="border-b whitespace-nowrap hover:bg-amber-700 transition-colors">
                  <td className="border text-center px-4 py-2">
                    {(page - 1) * (pagination?.pageSize ?? 15) + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-medium">{coupon.code}</td>
                  <td className="border px-4 py-2 text-center">{coupon.discountType === "percentage" ? "Phần trăm" : "Cố định"}</td>
                  <td className="border px-4 py-2 text-right">{coupon.value}</td>
                  <td className="border px-4 py-2 text-right">{coupon.minOrderValue ?? 0}</td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        coupon.status === "active"
                          ? "bg-green-100 text-green-600"
                          : coupon.status === "inactive"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {coupon.validFrom ? new Date(coupon.validFrom).toLocaleDateString("vi-VN") : "-"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {coupon.validTo ? new Date(coupon.validTo).toLocaleDateString("vi-VN") : "-"}
                  </td>
                  <td className="border px-4 py-2 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/admin/coupons/${coupon.id}`, { state: { coupon } })}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => navigate(`/admin/coupons/${coupon.id}/edit`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-4 py-4 text-center text-gray-500">
                  Không có coupon nào
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
                className={`px-3 py-1 border rounded ${page === p ? "bg-blue-500 text-white" : ""}`}
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
