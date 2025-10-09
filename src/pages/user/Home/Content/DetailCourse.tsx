import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

const DetailCourse = () => {
  //   const location = useLocation();
  //   console.log(location);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-10 p-8 max-w-6xl mx-auto">
      {/* Left content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">
          Lập trình C++ cơ bản, nâng cao
        </h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt
          đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái
          niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh
          phục con đường trở thành một lập trình viên.
        </p>

        {/* Course info summary */}
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
          <span>11 chương</span>
          <span>• 138 bài học</span>
          <span>• Thời lượng 10 giờ 29 phút</span>
        </div>

        {/* Sections */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Chương 1: Giới thiệu</AccordionTrigger>
            <AccordionContent>
              Giới thiệu tổng quan khóa học, cài đặt môi trường và các bước đầu
              tiên.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Chương 2: Cấu trúc ngôn ngữ C++</AccordionTrigger>
            <AccordionContent>
              Tìm hiểu về biến, kiểu dữ liệu, hàm và vòng lặp trong C++.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Right sidebar */}
      <div className="md:w-72 flex flex-col items-center">
        <div className="w-full bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-xl overflow-hidden shadow-md">
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
          Miễn phí
        </h2>

        <button
          onClick={() => navigate("/coursevid")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow"
        >
          ĐĂNG KÝ HỌC
        </button>

        <ul className="text-gray-600 text-sm mt-5 space-y-2">
          <li>💡 Trình độ cơ bản</li>
          <li>📚 Tổng số 138 bài học</li>
          <li>⏱️ Thời lượng 10 giờ 29 phút</li>
          <li>💻 Học mọi lúc, mọi nơi</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailCourse;
