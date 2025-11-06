import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../services/axiosClient";
import type { User } from "../../../types/user";
import {
  FaKey,
  FaBirthdayCake,
  FaPhoneAlt,
  FaAlgolia,
  FaMapMarkerAlt,
  FaUserTie,
  FaCalendarAlt,
  FaArrowLeft,
  FaBookOpen,
} from "react-icons/fa";

export default function UserDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(location.state?.user || null);
  const [loading, setLoading] = useState(!location.state?.user);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/users/${id}`)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.error("❌ Lỗi khi fetch user:", err);
          setUser(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const roleLabel = (roleName?: string) => {
    if (!roleName) return "—";
    const map: Record<string, string> = {
      student: "Học viên",
      instructor: "Giảng viên",
    };
    return map[roleName] ?? roleName;
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Không tìm thấy dữ liệu khóa học
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
          Chi tiết người dùng
        </h1>
      </div>

      {/* Card chính */}
      <div className="p-8 rounded-3xl shadow-xl space-y-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        {/* Tên & email */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-sm text-indigo-500 italic">{user.email}</p>
        </div>

        {/* Chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Cột trái */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaKey className="mr-3 text-yellow-500 text-lg" />
              ID: {user.id}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaUserTie className="mr-3 text-blue-600 text-lg" />
              Vai trò:{" "}
              <span className="ml-2 capitalize">
                {roleLabel(user.role?.name)}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaBirthdayCake className="mr-3 text-pink-500 text-lg" />
              Ngày sinh:{" "}
              {user.profile?.dateOfBirth
                ? new Date(user.profile.dateOfBirth).toLocaleDateString("vi-VN")
                : "Chưa cập nhật"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaPhoneAlt className="mr-3 text-green-500 text-lg" />
              Số điện thoại: {user.profile?.phone || "Chưa cập nhật"}
            </p>
            {user.role?.name === "student" && (
              <div className="flex flex-col text-gray-800 font-medium">
                <span className="flex items-center mb-1">
                  <FaBookOpen className="mr-3 text-purple-500 text-lg" />
                  Khóa học đang học:
                </span>
                {user.enrollments && user.enrollments.length > 0 ? (
                  <ul className="ml-8 list-decimal list-inside">
                    {user.enrollments.map((enroll) => (
                      <li key={enroll.id}>
                        {enroll.course?.title || "Chưa có tên khóa học"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="ml-8">Chưa đăng ký khóa học</span>
                )}
              </div>
            )}
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaMapMarkerAlt className="mr-3 text-pink-500 text-lg" />
              Địa chỉ: {user.profile?.address || "Chưa có"}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaAlgolia className="mr-3 text-pink-500 text-lg" />
              Trạng thái:
              <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : user.status === "inactive"
                    ? "bg-yellow-100 text-yellow-700"
                    : user.status === "banned"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {user.status}
              </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-indigo-500 text-lg" />
              Ngày tạo:{" "}
              {new Date(user.createdAt || "").toLocaleDateString("vi-VN")}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-purple-500 text-lg" />
              Cập nhật gần nhất:{" "}
              {new Date(user.updatedAt || "").toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Thumbnail dạng carousel mini */}
        {user.avatarUrl && (
          <div className="mt-6">
            <p className="font-semibold mb-3 text-gray-800 text-lg">
              Ảnh đại diện:
            </p>
            <img
              src={`http://localhost:3000${user.avatarUrl}`}
              alt={user.name}
              className="w-48 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
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
