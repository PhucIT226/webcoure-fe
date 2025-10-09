import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

const CourseVid = () => {
  const lessons = [
    {
      title: "1. Giới thiệu",
      duration: "07:07",
      lessons: [
        { name: "Giới thiệu khóa học", time: "01:03", active: true },
        { name: "Cài đặt Dev - C++", time: "02:31", locked: true },
        { name: "Hướng dẫn sử dụng Dev - C++", time: "03:33", locked: true },
      ],
    },
    {
      title: "2. Biến và kiểu dữ liệu",
      duration: "1:15:09",
      lessons: [],
    },
    {
      title: "3. Cấu trúc điều khiển và vòng lặp",
      duration: "1:28:03",
      lessons: [],
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Course video"
            allowFullScreen
          ></iframe>
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-white border-l overflow-y-auto">
          <div className="p-4 border-b font-semibold text-gray-700">
            Nội dung khóa học
          </div>

          <Accordion type="single" collapsible>
            {lessons.map((section, i) => (
              <AccordionItem key={i} value={`section-${i}`}>
                <AccordionTrigger className="bg-gray-100 px-4 py-3 flex justify-between text-left font-medium text-gray-800 hover:bg-gray-200">
                  <span>{section.title}</span>
                  <span className="text-sm text-gray-500">
                    {section.duration}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {section.lessons.length > 0 ? (
                    <ul className="divide-y">
                      {section.lessons.map((l, j) => (
                        <li
                          key={j}
                          className={`p-3 text-sm flex justify-between items-center cursor-pointer ${
                            l.active
                              ? "bg-orange-50 text-orange-600 font-medium"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span>
                            {l.locked ? "🔒 " : "▶ "} {l.name}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {l.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm px-4 py-3 italic">
                      Chưa có bài học
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-center gap-4 py-3 border-t bg-white">
        <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
          Bài trước
        </button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          Bài tiếp theo
        </button>
      </div>
    </div>
  );
};

export default CourseVid;
