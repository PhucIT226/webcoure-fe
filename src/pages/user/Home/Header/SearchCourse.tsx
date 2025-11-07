import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchCourses } from "../../../../redux/courseSlice";
import type { Course } from "../../../../types/course";
import { MdOutlineStar } from "react-icons/md";
import { BASE_API_URL } from "../../../../constants";

const SearchCourses = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation(); // lấy query từ URL, ví dụ ?search=react
  const queryParams = new URLSearchParams(search);
  const searchValue = queryParams.get("search") || "";
  const navigate = useNavigate();

  const courses = useAppSelector((state) => state.course.data);
  const loading = useAppSelector((state) => state.course.loading);

  const [page] = useState(1);

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchCourses({ page, pageSize: 15, search: searchValue }));
    }
  }, [dispatch, page, searchValue]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">
        Kết quả tìm kiếm cho:{" "}
        <span className="text-primary">"{searchValue}"</span>
      </h2>

      {loading && <p className="text-gray-500 text-center">Đang tải...</p>}

      {!loading && courses.length === 0 && (
        <p className="text-center text-gray-500">
          Không tìm thấy khóa học nào.
        </p>
      )}

      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course: Course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
              onClick={() =>
                navigate(`/course/${course.id}`, {
                  state: {
                    courseTitle: course.title,
                    courseDes: course.description,
                    courseId: course.id,
                    coursePrice: course.price,
                    courseImage: course.thumbnailUrl,
                  },
                })
              }
            >
              <img
                src={`${BASE_API_URL}${course.thumbnailUrl}`}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MdOutlineStar className="text-yellow-500" />
                    <span>4.7</span>
                  </div>
                  <div>458k Rating</div>
                  <div>87.8h</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCourses;
