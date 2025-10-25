import { useNavigate } from "react-router-dom";
import UserForm from "../../../components/admin/users/UserForm";
import UserService from "../../../services/userService";

export default function UserCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data: any, files?: File[]) => {
    try {
      await UserService.create(data, files);
      alert("Thêm người dùng thành công!");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm người dùng");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-6 py-4">Thêm người dùng mới</h1>
      <UserForm onSubmit={handleCreate} />
    </div>
  );
}
