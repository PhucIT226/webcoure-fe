import { useEffect, useState } from "react";
import "../../../../styles/user/home/Categories.scss";
import { useAppDispatch } from "../../../../hooks";
import { fetchCategories } from "../../../../redux/categorySlice";
import { fetchCourses } from "../../../../redux/courseSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import type { TAny } from "../../../../types/common";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const dispatch = useAppDispatch();

  const categories = useSelector((state: RootState) => state.category.data);
  const courses = useSelector((state: RootState) => state.course.data);
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<TAny>(null);

  // 🟢 Lấy dữ liệu ban đầu
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && activeCategory === null) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  // 🟢 Lọc courses theo category đang chọn
  const filteredCourses = courses.filter(
    (course) => course.categoryId === activeCategory
  );

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-xl">
        All the skills you need in one place
      </h2>
      <p className="text-lg mb-4">
        From critical skills to technical topics, browse your category
      </p>

      {/* Thanh danh mục */}
      <div className="categories mb-4 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* List khóa học */}
      <div className="courses grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses.length === 0 ? (
          <b>No courses in this category yet.</b>
        ) : (
          filteredCourses.map((course) => (
            <div
              className="course-card border rounded-lg p-3 hover:shadow-lg transition cursor-pointer"
              key={course.id}
              onClick={() =>
                navigate(`/course/${course.id}`, {
                  state: {
                    courseTitle: course.title,
                    courseDes: course.description,
                    courseId: course.id,
                    coursePrice: course.price,
                  },
                })
              }
            >
              {course.thumbnailUrls?.[0] && (
                <img
                  src={course.thumbnailUrls[0].url}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h3 className="font-semibold mt-2">{course.title}</h3>
              <p className="mt-1">{course.price?.toLocaleString?.() || 0} ₫ </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
