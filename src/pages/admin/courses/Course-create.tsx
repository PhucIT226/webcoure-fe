import { useNavigate } from "react-router-dom";
import CourseForm from "../../../components/admin/courses/CourseForm";
import CourseService from "../../../services/courseService";

export default function CourseCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data: any, files?: File[]) => {
    try {
      await CourseService.create(data, files);
      alert("Thêm khóa học thành công!");
      navigate("/admin/courses");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi thêm khóa học");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-6 py-4">Thêm khóa học mới</h1>
      <CourseForm onSubmit={handleCreate} />
    </div>
  );
}
