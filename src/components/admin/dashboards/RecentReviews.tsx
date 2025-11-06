import { useAppSelector } from "../../../hooks";
import { FaStar, FaUserCircle, FaBookOpen, FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const RecentReviews = () => {
  const navigate = useNavigate();
  const { recentReviews } = useAppSelector((state) => state.dashboard);

  const handleNavigate = (id: string) => {
    navigate(`reviews/${id}`);
  }

  if (!recentReviews?.length) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          Đánh giá gần đây
        </h3>
        <p className="text-gray-500 text-sm italic">
          Chưa có đánh giá nào 💤
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaStar className="text-yellow-500" />
        Đánh giá gần đây
      </h3>

      <ul className="divide-y divide-gray-100">
        {recentReviews.map((r) => (
          <li
            key={r.id}
            onClick={() => handleNavigate(r.id)}
            className="py-4 flex items-start gap-3 hover:bg-gray-50 rounded-xl px-3 transition-all"
          >
            <FaUserCircle className="text-3xl text-gray-400 mt-1 flex-shrink-0" />

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-800">{r.user.name}</p>
                <span className="text-xs text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <p className="flex items-center text-sm text-gray-500 gap-2">
                <FaBookOpen className="text-blue-500" />
                <span>{r.course.title}</span>
              </p>

              <div className="flex items-center mt-1 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < r.rating ? "text-yellow-400" : "text-gray-300"
                    } text-sm`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700 mt-2 flex items-start gap-2">
                <FaQuoteLeft className="text-gray-400 mt-1" />
                <span>{r.comment}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
