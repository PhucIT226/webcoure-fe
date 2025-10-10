import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { createCourse, updateCourse } from "../../../redux/courseSlice";
import type { TAny } from "../../../types/common";

type Props = {
  initialData?: TAny;
  onClose: () => void;
import { useEffect } from "react";
import type { Course } from "../../../types/course";

type Props = {
  initialData?: Course | null;
  onSubmit: (data: Partial<Course>, files?: File[]) => void;
};

export default function CourseForm({ initialData, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState({ name: "" });
  const [category, setCategory] = useState({ name: "" });
  const [price, setPrice] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [status, setStatus] = useState<"published" | "draft" | "closed">("draft");
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const handleSubmit = (e: TAny) => {
    e.preventDefault();
    const payload = { title, instructor, category, price, status };
    if (initialData?.id) {
      dispatch(updateCourse({ id: initialData.id, course: payload }));
    } else {
      dispatch(createCourse(payload));
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSlug(initialData.slug || "");
      setDescription(initialData.description || "");
      setInstructor(initialData.instructor || { name: "" });
      setCategory(initialData.category || { name: "" });
      setPrice(initialData.price || 0);
      setStudentCount(initialData.studentCount || 0);
      setStatus(initialData.status || "draft");
      setPreview(initialData.thumbnailUrls?.map((img) => img.url) || []);
    }
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setThumbnailFiles(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Partial<Course> = {
      title,
      slug,
      description,
      instructor,
      category,
      price,
      status,
    };
    onSubmit(data, thumbnailFiles);
  };

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

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="Tên khóa học"
        className="border px-3 py-2 rounded"
        required
      />

      <input
        value={slug}
        placeholder="Đường dẫn (slug)"
        className="border px-3 py-2 rounded bg-gray-50"
        readOnly
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Mô tả khóa học"
        className="border px-3 py-2 rounded min-h-[80px]"
      />

      <input
        value={instructor.name}
        onChange={(e) => setInstructor({ ...instructor, name: e.target.value })}
        placeholder="Tên giảng viên"
        className="border px-3 py-2 rounded"
        required
      />

      <input
        value={category.name}
        onChange={(e) => setCategory({ name: e.target.value })}
        placeholder="Danh mục"
        className="border px-3 py-2 rounded"
        required
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Giá"
        className="border px-3 py-2 rounded"
        required
      />

      {initialData && (
        <input
          type="number"
          value={studentCount}
          readOnly
          className="border px-3 py-2 rounded bg-gray-100 text-gray-600"
          placeholder="Số lượng học viên (tự động)"
        />
      )}

      <select
        value={status}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "published" || value === "draft" || value === "closed") {
            setStatus(value);
          }
        }}
        className="border px-3 py-2 rounded"
      >
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="closed">Closed</option>
      </select>

      <input
        type="file"
        multiple
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

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        {initialData ? "Cập nhật" : "Thêm mới"}
      </button>
    </form>
  );
}
