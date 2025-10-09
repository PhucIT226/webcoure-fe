import { useEffect, useState } from "react";

type Instructor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  courses: number;
  createdAt: string;
  status: "active" | "inactive";
  avatarUrl: string;
};

export default function InstructorListPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Giả lập API
    setInstructors([
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "a@example.com",
        phone: "0123456789",
        specialty: "Front-end",
        courses: 5,
        createdAt: "2025-01-15",
        status: "active",
        avatarUrl: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "b@example.com",
        phone: "0987654321",
        specialty: "Back-end",
        courses: 3,
        createdAt: "2025-02-01",
        status: "inactive",
        avatarUrl: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
      },
    ]);
  }, []);

  const filteredInstructors = instructors.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Quản lý giảng viên</h1>
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
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tên giảng viên</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">SĐT</th>
              <th className="px-4 py-3">Chuyên ngành</th>
              <th className="px-4 py-3">Số khóa học</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstructors.map((i) => (
              <tr key={i.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{i.id}</td>
                <td className="px-4 py-2">
                  <img
                    src={i.avatarUrl}
                    alt={i.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{i.name}</td>
                <td className="px-4 py-2">{i.email}</td>
                <td className="px-4 py-2">{i.phone}</td>
                <td className="px-4 py-2">{i.specialty}</td>
                <td className="px-4 py-2">{i.courses}</td>
                <td className="px-4 py-2">{i.createdAt}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      i.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {i.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                    Sửa
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filteredInstructors.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Không có giảng viên nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
