import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseForm from "../../../components/admin/courses/CourseForm";
import CourseService from "../../../services/courseService";
import type { Course } from "../../../types/course";

export default function CourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CourseService.getById(id!);
        setCourse(res);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy khóa học");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data: Partial<Course>, files?: File[]) => {
    try {
      await CourseService.update(id!, data, files);
      alert("Cập nhật khóa học thành công!");
      navigate("/admin/courses");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật khóa học");
    }
  };

  if (!course) return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-4">Chỉnh sửa khóa học</h1>
      <CourseForm initialData={course} onSubmit={handleUpdate} />
    </div>
  );
}
