import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../../../components/admin/users/UserForm";
import UserService from "../../../services/userService";
import type { User } from "../../../types/user";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getById(id!);
        setUser(res);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy người dùng");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data: Partial<User>, files?: File[]) => {
    try {
      await UserService.update(id!, data, files);
      alert("Cập nhật người dùng thành công!");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật người dùng");
    }
  };

  if (!user) return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-4">
        Chỉnh sửa người dùng
      </h1>
      <UserForm initialData={user} onSubmit={handleUpdate} />
    </div>
  );
}
