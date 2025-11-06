import { useAppSelector } from "../../../hooks";
import { FaFireAlt, FaBookOpen } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


export const TopCourses = () => {
  const navigate = useNavigate();
  const { topCourses, loading } = useAppSelector((state) => state.dashboard);

  const handleNavigate = (id: string) => {
    navigate(`courses/${id}`);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaFireAlt className="text-red-500" />
        Top khóa học bán chạy
      </h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Đang tải dữ liệu...</p>
      ) : topCourses.length === 0 ? (
        <p className="text-gray-500 text-sm italic">Chưa có dữ liệu 📭</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {topCourses.map((course, index) => (
            <li
              key={course.id}
              onClick={() => handleNavigate(course.id)}
              className="py-4 flex justify-between items-center hover:bg-gray-50 px-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-gray-400"
                      : index === 2
                      ? "bg-amber-700"
                      : "bg-blue-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaBookOpen className="text-blue-500" />
                    {course.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-blue-600 font-semibold">
                <FiTrendingUp className="text-green-500" />
                {course.salesCount} lượt bán
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
