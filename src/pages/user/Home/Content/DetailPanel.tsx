import { useState } from "react";
import "../../../../styles/user/home/Detail.scss";
import {
  FaHandsHelping,
  FaCertificate,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";

const DetailPanel = () => {
  const items = [
    {
      id: 1,
      title: "Hands-on training",
      desc: "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
      icon: <FaHandsHelping />,
    },
    {
      id: 2,
      title: "Certification prep",
      desc: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
      icon: <FaCertificate />,
    },
    {
      id: 3,
      title: "Insights and analytics",
      desc: "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
      icon: <FaChartLine />,
    },
    {
      id: 4,
      title: "Customizable content",
      desc: "Create tailored learning paths for team and organization goals and even host your own content and resources.",
      icon: <FaCogs />,
    },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="container mx-auto">
      <div className="title mb-10 text-center">
        <h2 className="text-3xl font-semibold">
          Learning focused on your goals
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Sidebar */}
        <div className="sidebar flex flex-col gap-4 md:w-1/3">
          {items.map((item) => (
            <button
              key={item.id}
              className={`menu-btn flex items-center gap-3 px-4 py-2 border rounded-lg transition ${
                active === item.id
                  ? "active bg-blue-100 border-blue-400"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActive(item.id)}
            >
              <span className="icon text-xl text-blue-500">{item.icon}</span>
              {item.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="content flex-1 bg-white shadow-md rounded-xl p-6">
          {active ? (
            <div className="info">
              <h2 className="text-2xl font-semibold mb-2">
                {items.find((i) => i.id === active)?.title}
              </h2>
              <p className="text-gray-600">
                {items.find((i) => i.id === active)?.desc}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              👉 Bấm vào menu bên trái để xem chi tiết
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
