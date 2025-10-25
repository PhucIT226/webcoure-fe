import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../../../components/admin/categories/CategoryForm";
import CategoryService from "../../../services/categoryService";
import type { Category } from "../../../types/category";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);

  // 🧩 Lấy dữ liệu category theo id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CategoryService.getById(id!);
        setCategory(res);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy danh mục");
      }
    };
    fetchData();
  }, [id]);

  // 🧩 Xử lý cập nhật danh mục
  const handleUpdate = async (data: Partial<Category>) => {
    try {
      await CategoryService.update(id!, data);
      alert("Cập nhật danh mục thành công!");
      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật danh mục");
    }
  };

  if (!category) return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-4">
        Chỉnh sửa danh mục
      </h1>
      <CategoryForm initialData={category} onSubmit={handleUpdate} />
    </div>
  );
}
