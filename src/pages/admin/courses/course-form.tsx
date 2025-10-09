import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { createCourse, updateCourse } from "../../../redux/courseSlice";

type Props = {
  initialData?: any;
  onClose: () => void;
};

export default function CourseForm({ initialData, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(initialData?.title || "");
  const [instructor, setInstructor] = useState(initialData?.instructor || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [status, setStatus] = useState(initialData?.status || "draft");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = { title, instructor, category, price, status };
    if (initialData?.id) {
      dispatch(updateCourse({ id: initialData.id, data: payload }));
    } else {
      dispatch(createCourse(payload));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit" : "Add"} Course</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="input" />
          <input value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="Instructor" className="input" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="input" />
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" className="input" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{initialData ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
