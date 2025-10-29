import { useState, useEffect } from "react";
import type { User } from "../../../types/user";
import axios from "../../../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type Role = { id: string; name: string };

type Props = {
  initialData?: User | null;
  onSubmit: (data: Partial<User>, files?: File[]) => void;
};

export default function UserForm({ initialData, onSubmit }: Props) {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [roleId, setRoleId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [status, setStatus] = useState<"active" | "inactive" | "banned" | "pending">("active");
  const [avatarFiles, setAvatarFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await axios.get("/roles");
      setRoles(res.data.data || []);
    };
    fetchRoles();
  }, []);

  // 🧩 Nếu đang sửa thì load dữ liệu cũ
  useEffect(() => {
    if (initialData) {
      setRoleId(initialData.roleId || "");
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setPhone(initialData.profile?.phone || "");
      setAddress(initialData.profile?.address || "");
      setDateOfBirth(initialData.profile?.dateOfBirth || "");
      setStatus(initialData.status || "active");
      setPreview(initialData.avatarUrls?.map((img) => img.url) || []);
    }
  }, [initialData]);

  // 🧩 Upload file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAvatarFiles(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!roleId) newErrors.roleId = "Vui lòng chọn vai trò.";
    if (!name.trim()) newErrors.name = "Tên không được để trống.";
    if (!email.trim()) newErrors.email = "Email không được để trống.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email không hợp lệ.";

    if (phone && !/^\d{9,11}$/.test(phone))
      newErrors.phone = "Số điện thoại chỉ được chứa 9–11 chữ số.";

    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      if (dob > new Date()) newErrors.dateOfBirth = "Ngày sinh không được lớn hơn hôm nay.";
    } else {
      newErrors.dateOfBirth = "Vui lòng chọn ngày sinh.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🧩 Gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data: Partial<User> = {
      roleId,
      name: name.trim(),
      email: email.trim(),
      profile: {
        phone: phone.trim(),
        address: address.trim(),
        dateOfBirth: dateOfBirth.trim(),
      },
      status,
    };

    onSubmit(data, avatarFiles);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Role */}
      <div>
        <select
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">-- Chọn vai trò --</option>
          {roles
            .filter((r) => r.name !== "admin")
            .map((r) => (
              <option key={r.id} value={r.id}>
                {r.name === "student" ? "Học viên" : r.name === "instructor" ? "Giảng viên" : r.name}
              </option>
            ))}
        </select>

        {errors.roleId && <p className="text-red-500 text-sm mt-1">{errors.roleId}</p>}
      </div>

      {/* Tên */}
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên người dùng"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
          className="border px-3 py-2 rounded w-full"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Address */}
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Địa chỉ"
        className="border px-3 py-2 rounded min-h-[80px]"
      />

      {/* Date of Birth */}
      <div>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "active" | "inactive" | "banned" | "pending")
        }
        className="border px-3 py-2 rounded"
      >
        <option value="active">Hoạt động</option>
        <option value="inactive">Ngừng hoạt động</option>
        <option value="banned">Bị khóa</option>
        <option value="pending">Chờ xác nhận</option>
      </select>

      {/* Avatar */}
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
          {initialData ? "Cập nhật người dùng" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
}
