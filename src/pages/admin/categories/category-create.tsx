import { useNavigate } from "react-router-dom";
import CategoryForm from "../../../components/admin/categories/CategoryForm";
import CategoryService from "../../../services/categoryService";

export default function CategoryCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    try {
      await CategoryService.create(data);
      alert("Thêm danh mục thành công!");
      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm danh mục");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-6 py-4">
        Thêm danh mục mới
      </h1>
      <CategoryForm onSubmit={handleCreate} />
    </div>
  );
}
