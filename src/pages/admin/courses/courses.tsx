import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchCourses, deleteCourse } from "../../../redux/courseSlice";
import type { Course } from "../../../types/course";
import { useNavigate } from "react-router-dom";

export default function CourseList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: courses, pagination, loading, error } = useAppSelector(
    (state) => state.course
  );

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    dispatch(fetchCourses({
      page, 
      pageSize: 15, 
      search, 
      sortField, 
      sortOrder 
    }));
  }, [dispatch, page, search, sortField, sortOrder]);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa khóa học này?")) {
      dispatch(deleteCourse(id));
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
      {/* Header + Search */}
      <div className="sticky top-16 z-20 p-4 my-4 bg-yellow-700 shadow-lg rounded-sm text-white ">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Quản lý khóa học</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tìm khóa học..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border bg-base-100 px-3 py-2 rounded-md text-sm text-base-content"
            />
            <button
              onClick={handleSearch}
              className="
                bg-gradient-to-r from-indigo-500 to-purple-500 
                hover:from-indigo-600 hover:to-purple-600
                text-white px-4 py-2 rounded-md text-sm"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Button add */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/courses/create")}
          className="bg-green-600 hover:bg-green-700 text-lg text-white px-4 py-2 rounded-md text-sm"
        >
          Thêm khóa học
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
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Tên {renderSortIcon("title")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("instructor")}
              >
                Giảng viên {renderSortIcon("instructor")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Giá {renderSortIcon("price")}
              </th>
              <th
                className="border text-center px-4 py-3 cursor-pointer"
                onClick={() => handleSort("studentCount")}
              >
                Học viên {renderSortIcon("studentCount")}
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
            {courses.length > 0 ? (
              courses.map((course: Course, index: number) => (
                <tr
                  key={course.id}
                  className="border-b whitespace-nowrap hover:bg-amber-700 transition-colors"
                >
                  <td className="border text-center px-4 py-2">
                    {(page - 1) * (pagination?.pageSize ?? 15) + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-medium">{course.title}</td>
                  <td className="border px-4 py-2">{course.instructor?.name}</td>
                  <td className="border px-4 py-2 text-right">
                    {Number(course.price).toLocaleString("vi-VN")} đ
                  </td>
                  <td className="border text-center px-4 py-2">
                    {course.studentCount ?? 0}
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        course.status === "published"
                          ? "bg-green-100 text-green-600"
                          : course.status === "draft"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="border text-center px-4 py-2">
                    {new Date(course.createdAt || "").toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-4 py-2 text-center flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/courses/${course.id}`, { state: { course } })
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(course.id!)}
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
                  Không có khóa học nào
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
