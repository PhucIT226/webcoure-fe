import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchReviews, deleteReview, approveReview } from "../../../redux/reviewSlice";
import type { Review } from "../../../types/review";
import { useNavigate } from "react-router-dom";

export default function ReviewList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: reviews, pagination, loading, error } = useAppSelector(
    (state) => state.review
  );

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"pending" | "approved" | "rejected" | "">("");

  useEffect(() => {
    dispatch(fetchReviews({
      page,
      pageSize: 15,
      search,
      sortField,
      sortOrder,
      status: statusFilter || undefined,
    }));
  }, [dispatch, page, search, sortField, sortOrder, statusFilter]);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa đánh giá này?")) {
      dispatch(deleteReview(id));
    }
  };

  const handleApprove = (id: string) => {
    if (confirm("Bạn có chắc muốn duyệt đánh giá này?")) {
      dispatch(approveReview(id));
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

  const pages: number[] = [];
  if (pagination) {
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <div className="p-6">
      {/* Header + Search + Status Filter */}
      <div className="sticky top-16 z-20 p-4 my-4 bg-yellow-700 shadow-lg rounded-sm text-white ">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h1 className="text-xl font-bold">Quản lý đánh giá</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border bg-base-100 px-3 py-2 rounded-md text-sm text-base-content"
            />
            <button
              onClick={handleSearch}
              className="
                bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 
                hover:to-purple-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Tìm kiếm
            </button>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => { setPage(1); setStatusFilter(e.target.value as any); }}
                className="
                  border border-gray-300 bg-base-100 px-4 py-2 rounded-lg text-sm text-base-content 
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                  shadow-sm hover:border-gray-400 transition-all duration-200"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ duyệt</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Bị từ chối</option>
              </select>
            </div>
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
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("user")}>
                Người đánh giá {renderSortIcon("user")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("course")}>
                Khóa học {renderSortIcon("course")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("rating")}>
                Sao {renderSortIcon("rating")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("status")}>
                Trạng thái {renderSortIcon("status")}
              </th>
              <th className="border text-center px-4 py-3 cursor-pointer" onClick={() => handleSort("createdAt")}>
                Ngày tạo {renderSortIcon("createdAt")}
              </th>
              <th className="border text-center px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review: Review, index: number) => (
                <tr
                  key={review.id}
                  className="border-b whitespace-nowrap hover:bg-amber-700 transition-colors"
                >
                  <td className="border text-center px-4 py-2">
                    {(page - 1) * (pagination?.pageSize ?? 15) + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-medium">{review.user?.name}</td>
                  <td className="border px-4 py-2">{review.course?.title}</td>
                  <td className="border px-4 py-2 text-center">{review.rating}</td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        review.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : review.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="border text-center px-4 py-2">
                    {new Date(review.createdAt || "").toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border text-center px-4 py-2 flex gap-2 justify-start">
                    <button
                      onClick={() =>
                        navigate(`/admin/reviews/${review.id}`, { state: { review } })
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Chi tiết
                    </button>
                    {review.status === "pending" && (
                      <button
                        onClick={() => handleApprove(review.id!)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Duyệt
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(review.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  Không có đánh giá nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages.length > 1 && (
        <div className="flex gap-2 mt-4">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 border rounded ${
                page === p ? "bg-blue-500 text-white" : ""
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
