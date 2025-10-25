import { useLocation, useNavigate } from "react-router-dom";
import type { Category } from "../../../types/category";
import { FaKey, FaFileAlt, FaAlgolia, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

export default function CategoryDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.cat as Category | undefined;

  if (!category) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Không tìm thấy dữ liệu danh mục
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
          Chi tiết danh mục
        </h1>
      </div>

      {/* Card chính */}
      <div className="p-8 rounded-3xl shadow-xl space-y-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        {/* Title & slug */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">{category.name}</h2>
          <p className="text-sm text-indigo-500 italic">/{category.slug}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-lg">
          Mô tả: {category.description || "—"}
        </p>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Cột trái */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaKey className="mr-3 text-yellow-500 text-lg" />
              Mã danh mục: {category.id}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaFileAlt className="mr-3 text-blue-600 text-lg" />
              Số khóa học: {category.courseCount ?? 0}
            </p>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaAlgolia className="mr-3 text-pink-500 text-lg" />
              Trạng thái:
              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  category.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {category.status}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-indigo-500 text-lg" />
              Ngày tạo: {new Date(category.createdAt || "").toLocaleDateString("vi-VN")}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-purple-500 text-lg" />
              Cập nhật gần nhất: {new Date(category.updatedAt || "").toLocaleDateString("vi-VN")}
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
