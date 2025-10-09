import { useEffect, useState } from "react";

type Review = {
  id: number;
  studentName: string;
  courseTitle: string;
  comment: string;
  rating: number; // 1-5
  createdAt: string;
  status: "visible" | "hidden";
};

export default function ReviewListPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Giả lập API
    setReviews([
      {
        id: 1,
        studentName: "Nguyễn Văn A",
        courseTitle: "React Cơ Bản",
        comment: "Khóa học rất hay và dễ hiểu, giảng viên nhiệt tình.",
        rating: 5,
        createdAt: "2025-03-01",
        status: "visible",
      },
      {
        id: 2,
        studentName: "Trần Thị B",
        courseTitle: "Node.js Nâng Cao",
        comment: "Khóa học khá khó, nhưng nội dung chi tiết và đầy đủ.",
        rating: 4,
        createdAt: "2025-03-02",
        status: "hidden",
      },
    ]);
  }, []);

  const filteredReviews = reviews.filter(
    (r) =>
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Quản lý đánh giá</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          />
          <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
            Tìm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Học viên</th>
              <th className="px-4 py-3">Khóa học</th>
              <th className="px-4 py-3">Đánh giá</th>
              <th className="px-4 py-3">Sao</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{review.id}</td>
                <td className="px-4 py-2 font-medium">{review.studentName}</td>
                <td className="px-4 py-2">{review.courseTitle}</td>
                <td className="px-4 py-2 truncate max-w-xs">
                  {review.comment}
                </td>
                <td className="px-4 py-2">
                  {"⭐".repeat(review.rating)}
                </td>
                <td className="px-4 py-2">{review.createdAt}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      review.status === "visible"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {review.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                    Ẩn/Hiện
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filteredReviews.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Không có đánh giá nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
