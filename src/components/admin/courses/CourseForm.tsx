import { useState, useEffect } from "react";
import type { Course } from "../../../types/course";
import axios from "../../../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type Category = { id: string; name: string };
type Instructor = { id: string; name: string };

type Props = {
  initialData?: Course | null;
  onSubmit: (data: Partial<Course>, files?: File[]) => void;
};

export default function CourseForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [status, setStatus] = useState<"published" | "draft" | "closed">(
    "draft"
  );
  const [categoryId, setCategoryId] = useState<string>("");
  const [instructorId, setInstructorId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🧩 Load danh mục & giảng viên
  useEffect(() => {
    const fetchData = async () => {
      const [catRes, insRes] = await Promise.all([
        axios.get("/categories"),
        axios.get("/users?role=instructor"),
      ]);
      setCategories(catRes.data.data || []);
      setInstructors(insRes.data.data || []);
    };
    fetchData();
  }, []);

  // 🧩 Nếu đang sửa thì load dữ liệu cũ
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSlug(initialData.slug || "");
      setShortDescription(initialData.shortDescription || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || 0);
      setStatus(initialData.status || "draft");
      setCategoryId(initialData.categoryId ? String(initialData.categoryId) : "");
      setInstructorId(initialData.instructorId ? String(initialData.instructorId) : "");
    }
  }, [initialData]);

  // 🧩 Khi nhập title thì tự tạo slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(
      newTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  // 🧩 Upload file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setThumbnailFiles(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Vui lòng nhập tên khóa học";
    else if (title.length < 5) newErrors.title = "Tên khóa học phải từ 5 ký tự";

    if (!shortDescription.trim()) newErrors.shortDescription = "Vui lòng nhập mô tả ngắn";
    else if (shortDescription.length < 10)
      newErrors.shortDescription = "Mô tả ngắn phải từ 10 ký tự";

    if (!description.trim()) newErrors.description = "Vui lòng nhập mô tả chi tiết";
    else if (description.length < 20)
      newErrors.description = "Mô tả chi tiết phải từ 20 ký tự";

    if (price === "" || Number(price) <= 0) newErrors.price = "Giá khóa học phải lớn hơn 0";

    if (!categoryId) newErrors.categoryId = "Vui lòng chọn danh mục";
    if (!instructorId) newErrors.instructorId = "Vui lòng chọn giảng viên";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🧩 Gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data: Partial<Course> = {
      title: title.trim(),
      slug: slug.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      price: Number(price),
      status,
      categoryId,
      instructorId,
    };

    onSubmit(data, thumbnailFiles);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Title */}
      <div>
        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="Tên khóa học"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Slug */}
      <input
        value={slug}
        readOnly
        placeholder="Đường dẫn (slug)"
        className="border px-3 py-2 rounded bg-gray-50"
      />

      {/* Short Description */}
      <div>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Mô tả ngắn"
          className="border px-3 py-2 rounded min-h-[60px] w-full"
        />
        {errors.shortDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả chi tiết khóa học"
          className="border px-3 py-2 rounded min-h-[120px] w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Giá khóa học"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      {/* Category */}
      <div>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
      </div>

      {/* Instructor */}
      <div>
        <select
          value={instructorId}
          onChange={(e) => setInstructorId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">-- Chọn giảng viên --</option>
          {instructors.map((ins) => (
            <option key={ins.id} value={ins.id}>
              {ins.name}
            </option>
          ))}
        </select>
        {errors.instructorId && (
          <p className="text-red-500 text-sm mt-1">{errors.instructorId}</p>
        )}
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "published" | "draft" | "closed")
        }
        className="border px-3 py-2 rounded"
      >
        <option value="draft">Nháp</option>
        <option value="published">Công khai</option>
        <option value="closed">Đóng</option>
      </select>

      {/* Thumbnail */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border px-3 py-2 rounded"
      />

      {preview.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {preview.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="preview"
              className="w-full h-24 object-cover rounded-lg border"
            />
          ))}
        </div>
      )}

      {/* Submit */}
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
          {initialData ? "Cập nhật khóa học" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
