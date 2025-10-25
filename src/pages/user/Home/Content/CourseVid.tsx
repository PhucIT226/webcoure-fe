import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchLessons } from "../../../../redux/lessonSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CourseVid = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const { id } = useParams();
  const { lessons } = useAppSelector((state) => state.lesson);

  const [comments, setComments] = useState<{ name: string; text: string }[]>(
    []
  );
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [showQnA, setShowQnA] = useState(false);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons({ courseId }));
    }
  }, [courseId, dispatch]);

  let currentIndex = lessons.findIndex((lesson) => lesson.id === id);
  if (currentIndex === -1) currentIndex = 0;
  const currentLesson = lessons[currentIndex];

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      navigate(`/coursevid/${nextLesson.id}`, { state: { courseId } });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      navigate(`/coursevid/${prevLesson.id}`, { state: { courseId } });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setComments([{ name, text }, ...comments]);
    setName("");
    setText("");
  };

  return (
    <div className="relative flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 bg-black flex items-center justify-center">
          {currentLesson ? (
            <iframe
              className="w-full h-full"
              src={currentLesson.videoUrl}
              title={currentLesson.title}
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-white">Đang tải video...</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-white border-l overflow-y-auto">
          <div className="p-4 border-b font-semibold text-gray-700">
            Nội dung khóa học
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="section-1">
              <AccordionTrigger className="bg-gray-100 px-4 py-3 flex justify-between text-left font-medium text-gray-800 hover:bg-gray-200">
                <span>Bài học</span>
                <span className="text-sm text-gray-500">
                  {lessons.length} bài
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="divide-y">
                  {lessons.map((l, j) => (
                    <li
                      key={l.id}
                      className={`p-3 text-sm flex justify-between items-center cursor-pointer ${
                        currentIndex === j
                          ? "bg-orange-50 text-orange-600 font-medium"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        navigate(`/coursevid/${l.id}`, { state: { courseId } })
                      }
                    >
                      <span>▶ {l.title}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-center gap-4 py-3 border-t bg-white">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Bài trước
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === lessons.length - 1}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Bài tiếp theo
        </button>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setShowQnA(true)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all"
      >
        <span>💬</span> <span className="font-medium">Comment</span>
      </button>

      {/* Q&A Panel */}
      {showQnA && (
        <div className="fixed bottom-20 right-6 w-96 bg-white rounded-2xl shadow-2xl border p-4 max-h-[70vh] flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h3 className="font-semibold text-gray-800">Comment</h3>
            <button
              onClick={() => setShowQnA(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleAddComment} className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="Tên của bạn..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Viết bình luận..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm h-20"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
            >
              Gửi
            </button>
          </form>

          <div className="overflow-y-auto flex-1 space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                Chưa có câu hỏi hoặc bình luận nào.
              </p>
            ) : (
              comments.map((c, i) => (
                <div key={i} className="border-b pb-2">
                  <p className="font-medium text-orange-600">{c.name}</p>
                  <p className="text-gray-700 text-sm">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseVid;
