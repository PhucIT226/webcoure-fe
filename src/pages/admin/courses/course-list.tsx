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

  useEffect(() => {
    dispatch(fetchCourses({ page, pageSize: 15, search }));
  }, [dispatch, page, search]);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa khóa học này?")) {
      dispatch(deleteCourse(id));
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
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
              className="border bg-white px-3 py-2 rounded-md text-sm text-black"
            />
            <button
              onClick={handleSearch}
              className="btn-gradient btn-gradient:hover text-white px-4 py-2 rounded-md text-sm"
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
              <th className="border text-center px-4 py-3">Tên</th>
              <th className="border text-center px-4 py-3">Giảng viên</th>
              <th className="border text-center px-4 py-3">Giá</th>
              <th className="border text-center px-4 py-3">Học viên</th>
              <th className="border text-center px-4 py-3">Trạng thái</th>
              <th className="border text-center px-4 py-3">Ngày tạo</th>
              <th className="border text-center px-4 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course: Course, index: number) => (
                <tr
                  key={course.id}
                  className="border-b whitespace-nowrap hover:bg-gray-50 transition-colors"
                >
                  <td className="border text-center px-4 py-2">
                    {(page - 1) * (pagination?.pageSize ?? 15) + index + 1}
                  </td>
                  <td className="border px-4 py-2 font-medium">
                    {course.title}
                  </td>
                  <td className="border px-4 py-2">
                    {course.instructor?.name}
                  </td>
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
                    {new Date(course.createdAt || "").toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="border px-4 py-2 text-right flex gap-2 justify-end">
                    {/* Nút chi tiết dẫn sang trang chi tiết */}
                    <button
                      onClick={() => navigate(`/admin/course/${course.id}`, { state: { course } })}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
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
                <td
                  colSpan={9}
                  className="px-4 py-4 text-center text-gray-500"
                >
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
