import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../services/axiosClient";
import type { Review } from "../../../types/review";
import {
  FaKey,
  FaUser,
  FaBook,
  FaStar,
  FaAlgolia,
  FaCommentDots,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

export default function ReviewDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(
    location.state?.review || null
  );
  const [loading, setLoading] = useState(!location.state?.review);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/reviews/${id}`)
        .then((res) => {
          setReview(res.data.data);
        })
        .catch((err) => {
          console.error("❌ Lỗi khi fetch course:", err);
          setReview(null);
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

  if (!review) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Không tìm thấy dữ liệu đánh giá
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
          Chi tiết đánh giá
        </h1>
      </div>

      {/* Card chính */}
      <div className="p-8 rounded-3xl shadow-xl space-y-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        {/* User & Course */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
                <FaKey className="mr-3 text-yellow-500 text-lg" />
                Mã đánh giá: {review.id}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaUser className="mr-3 text-purple-500 text-lg" />
              Người đánh giá: {review.user?.name}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaBook className="mr-3 text-blue-600 text-lg" />
              Khóa học: {review.course?.title}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaStar className="mr-3 text-yellow-400 text-lg" />
              Sao: <span className="pr-2 font-bold">{review.rating}/5</span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="flex items-center text-gray-800 font-medium">
              <FaStar className="mr-3 text-yellow-400 text-lg" />
              Sao: <span className="pr-2 font-bold">{review.rating}/5</span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
                <FaAlgolia className="mr-3 text-pink-500 text-lg" />
                Trạng thái:
                <span
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    review.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : review.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
                >
                {review.status}
                </span>
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-indigo-500 text-lg" />
              Ngày tạo: {new Date(review.createdAt || "").toLocaleDateString("vi-VN")}
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <FaCalendarAlt className="mr-3 text-purple-500 text-lg" />
              Cập nhật gần nhất: {new Date(review.updatedAt || "").toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <p className="flex items-center text-gray-800 font-medium">
            <FaCommentDots className="mr-3 text-pink-500 text-lg" />
            Nội dung đánh giá:
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">{review.comment}</p>
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
