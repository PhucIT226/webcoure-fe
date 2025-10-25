import { useState, useEffect } from "react";
import type { Category } from "../../../types/category";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  initialData?: Category | null;
  onSubmit: (data: Partial<Category>) => void;
};

export default function CategoryForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "hidden">("active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🧩 Nếu đang sửa thì load dữ liệu cũ
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSlug(initialData.slug || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "active");
    }
  }, [initialData]);

  // 🧩 Khi nhập tên thì tự tạo slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(
      newName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  // 🧩 Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Vui lòng nhập tên danh mục";
    else if (name.length < 3) newErrors.name = "Tên danh mục phải từ 3 ký tự";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🧩 Gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data: Partial<Category> = {
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          status,
        };

    onSubmit(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <input
          value={name}
          onChange={handleNameChange}
          placeholder="Tên danh mục"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Slug */}
      <input
        value={slug}
        readOnly
        placeholder="Đường dẫn (slug)"
        className="border px-3 py-2 rounded bg-gray-50"
      />

      {/* Description */}
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả danh mục (tùy chọn)"
          className="border px-3 py-2 rounded min-h-[80px] w-full"
        />
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "active" | "hidden")}
        className="border px-3 py-2 rounded"
      >
        <option value="active">Hoạt động</option>
        <option value="hidden">Ẩn</option>
      </select>

      {/* Buttons */}
      <div className="mt-8 flex justify-between gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500
            hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg
            shadow-lg transition-all duration-300 font-medium
          "
        >
          <FaArrowLeft className="text-lg" />
          Quay lại
        </button>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg shadow-md font-medium"
        >
          {initialData ? "Cập nhật danh mục" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
