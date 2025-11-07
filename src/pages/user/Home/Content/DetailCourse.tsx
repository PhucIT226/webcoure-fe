import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchLessons } from "../../../../redux/lessonSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { addToCart } from "../../../../redux/cartSlice";
import { toast } from "react-toastify";

const DetailCourse = () => {
  const [showVideo, setShowVideo] = useState(false); // 👈 Quản lý modal video
  const location = useLocation();
  const courseId = location.state?.courseId;
  const courseTitle = location.state?.courseTitle;
  const coursePrice = location.state?.coursePrice;
  const courseImage = location.state?.courseImage;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { lessons, loading } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons({ courseId }));
    }
  }, [courseId, dispatch]);

  const totalDuration =
    lessons.length > 0
      ? Math.round(
          lessons.map((l) => l.duration || 0).reduce((a, b) => a + b, 0) /
            lessons.length
        )
      : 0;

  return (
    <div className="flex flex-col md:flex-row gap-10 p-8 max-w-6xl mx-auto">
      {/* Left content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{courseTitle}</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          {location?.state?.courseDes}
        </p>

        {/* Info summary */}
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
          <span>Tổng {lessons.length} bài học</span>
          {lessons.length > 0 && (
            <span>⏱️ Thời lượng trung bình: {totalDuration} phút</span>
          )}
        </div>

        {/* Lesson list */}
        {loading ? (
          <p>Đang tải...</p>
        ) : lessons.length === 0 ? (
          <p>Chưa có bài học nào trong khóa này.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {lessons.map((lesson, index) => (
              <AccordionItem key={lesson.id} value={`item-${index}`}>
                <AccordionTrigger>{lesson.title}</AccordionTrigger>
                <AccordionContent>
                  {lesson.content || "Nội dung đang cập nhật..."}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      {/* Right sidebar */}
      <div className="md:w-72 flex flex-col items-center">
        {/* 📽️ Khung xem giới thiệu */}
        <div
          onClick={() => setShowVideo(true)}
          className="cursor-pointer w-full bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition"
        >
          <div className="aspect-video flex justify-center items-center">
            <div className="bg-white/20 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <p className="text-center font-medium py-3">
            Xem giới thiệu khóa học
          </p>
        </div>

        <h2 className="text-3xl text-orange-500 font-semibold mt-6 mb-3">
          {coursePrice}đ
        </h2>

        <button
          onClick={() =>
            navigate(`/payment/${courseId}`, {
              state: { courseId, courseTitle, coursePrice },
            })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow"
        >
          Mua khoá học
        </button>

        <button
          onClick={() => {
            dispatch(
              addToCart({
                id: courseId,
                title: courseTitle,
                price: coursePrice,
                thumbnailUrl: courseImage,
              })
            );
            toast.success("Đã thêm vào giỏ hàng");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow mt-5"
        >
          Thêm vào giỏ hàng
        </button>

        <ul className="text-gray-600 text-sm mt-5 space-y-2">
          <li>💡 Trình độ cơ bản</li>
          <li>📚 Tổng {lessons.length} bài học</li>
          <li>⏱️ Thời lượng trung bình {totalDuration} phút</li>
          <li>💻 Học mọi lúc, mọi nơi</li>
        </ul>
      </div>

      {/* 📺 Modal Video Giới Thiệu */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowVideo(false)} // 👈 bấm ngoài tắt video
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()} // 👈 ngăn click bên trong tắt
          >
            {/* Nút đóng (tuỳ chọn) */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2"
            >
              ✕
            </button>
            {/* 👉 Video giới thiệu (YouTube hoặc nội bộ) */}
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/RE1lfCs6uaE"
              title="Giới thiệu khóa học"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCourse;
