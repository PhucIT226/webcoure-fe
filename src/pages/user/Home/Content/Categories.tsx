import { useState } from "react";
import "../../../../styles/user/home/Categories.scss";

const Categories = () => {
  <img src="" alt="" />;
  const categories = [
    {
      id: 1,
      name: "Data Science",
      courses: [
        {
          id: 101,
          title: "Python for Data Science",
          author: "John Doe",
          price: 309000,
          oldPrice: 1379000,
          rating: 4.5,
          learners: "119,987",
          image: "/python.jpg",
        },
        {
          id: 102,
          title: "Machine Learning Basics",
          author: "Jane Smith",
          price: 279000,
          oldPrice: 399000,
          rating: 4.3,
          learners: "91,313",
          image: "/machine.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Web Development",
      courses: [
        {
          id: 201,
          title: "React for Beginners",
          author: "Alice Nguyen",
          price: 309000,
          oldPrice: 1179000,
          rating: 4.6,
          learners: "26,639",
          image: "/reacttutor.jpg",
        },
        {
          id: 202,
          title: "Node.js & Express",
          author: "David Lee",
          price: 459000,
          oldPrice: 1779000,
          rating: 4.7,
          learners: "35,195",
          image: "/nodejsexpress.jpg",
        },
      ],
    },
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-xl">
        All the skills you need in one place
      </h2>
      <p className="text-lg mb-4">
        From critical skills to technical topics, browse your category
      </p>

      {/* Thanh danh mục */}
      <div className="categories mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={cat.id === activeCategory.id ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* List khóa học */}
      <div className="courses">
        {activeCategory.courses.map((course) => (
          <div className="course-card" key={course.id}>
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.author}</p>
            <p>
              ⭐ {course.rating} ({course.learners} learners)
            </p>
            <p>
              <b>{course.price.toLocaleString()} ₫</b>{" "}
              <span className="old-price">
                {course.oldPrice.toLocaleString()} ₫
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
