import { MdOutlineStar } from "react-icons/md";
import { useEffect } from "react";
import type { Course } from "../../../../types/course";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchCourses } from "../../../../redux/courseSlice";
import { useNavigate } from "react-router-dom";
import { getFullImageUrl } from "../../../../utils/imageUrl";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course.data);
  const loading = useAppSelector((state) => state.course.loading);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <div className="course_section mb-6">
        <h2 className="course-section__title">
          Ready to reimagine your career?
        </h2>
        <p className="course-section__subtitle">
          Get the skills and real-world experience employers want with Career
          Accelerators.
        </p>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {courses.slice(0, 3).map((course: Course) => (
            <div
              key={course.id}
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
              className="cursor-pointer"
            >
              <div className="course-card mt-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform">
                <div className="course-card_image mb-4">
                  <img
                    src={getFullImageUrl(course.thumbnailUrl)}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                </div>
                <div className="course-card_title mb-3 font-semibold text-lg text-gray-800">
                  {course.title}
                </div>
                <div className="course-stats flex items-center justify-between text-sm text-gray-600">
                  <div className="course-card_star flex items-center gap-1">
                    <MdOutlineStar className="star-color text-yellow-500" />
                    <span>4.7</span>
                  </div>
                  <div className="course-card_rating">458k Rating</div>
                  <div className="vid_length">
                    <span>87.8 total hours</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Courses;
