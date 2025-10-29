import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import axios from "../../../services/axiosClient";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const ProfileSettings = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    avatarUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);

  // ✅ Lấy profile khi load trang
  useEffect(() => {
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/profiles/me");
      console.log("📦 BE trả về toàn bộ response:", res);
      console.log("👉 BE trả về res.data:", res.data);

      // ✅ /profiles/me trả về 1 object user, không phải mảng
      const user = res.data?.data;
      if (!user) {
        toast.error("Không tìm thấy thông tin người dùng");
        return;
      }

      // ✅ Map field từ BE về FE
      const mappedProfile = {
        name: user.profile?.fullName || user.name || "",
        email: user.email || "",
        phone: user.profile?.phone || "",
        dob: user.profile?.dateOfBirth
          ? user.profile.dateOfBirth.split("T")[0]
          : "",
        address: user.profile?.address || "",
        avatarUrl: user.avatarUrl
          ? `${import.meta.env.VITE_BASE_API_URL || "http://localhost:3000"}${user.avatarUrl}`
          : "",
      };

      console.log("🧭 Dữ liệu đã map sang FE:", mappedProfile);
      setProfile(mappedProfile);
    } catch (err) {
      console.error("❌ Lỗi khi fetch profile:", err);
      toast.error("Không thể tải thông tin cá nhân");
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, []);

  // ✅ Xử lý change input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(`✏️ Thay đổi field: ${name} → ${value}`);
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Đổi ảnh đại diện
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("📸 File ảnh được chọn:", file);
    if (file) {
      const preview = URL.createObjectURL(file);
      console.log("🖼️ Preview URL:", preview);
      setProfile((prev) => ({ ...prev, avatarUrl: preview }));
      setFile(file);
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        formData.append(key, value || "");
      });
      if (file) formData.append("avatar", file);

      console.log("📤 FormData gửi lên BE:");
      for (const [key, value] of formData.entries()) {
        console.log(`   ${key}:`, value);
      }

      const res = await axios.patch("/profiles/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ BE phản hồi sau khi update:", res.data);

      const updated = res.data?.data;
      setProfile((prev) => ({
        ...prev,
        avatarUrl: updated.avatarUrl
          ? `${import.meta.env.VITE_BASE_API_URL || "http://localhost:3000"}${updated.avatarUrl}`
          : prev.avatarUrl,
      }));

      setFile(null);
      toast.success("Cập nhật thông tin thành công 🎉");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật thông tin:", err);
      toast.error("Lỗi khi cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>{t("loadingProfile")}</div>;

  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="font-semibold text-base-content text-center text-3xl mb-4">
        {t("profileTitle")}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <img
              src={
                profile.avatarUrl ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="avatarUpload"
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-all cursor-pointer rounded-full"
            >
              <FaCamera className="text-white text-lg" />
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="text-center">
            <p className="font-medium text-base-content text-lg">{profile.name}</p>
            <p className="text-md text-base-content">{profile.email}</p>
          </div>
        </div>

        {/* Input fields */}
        <div>
          <label className="text-lg text-base-content">{t("displayName")}</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
          />
        </div>

        <div>
          <label className="text-lg text-base-content">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
            disabled
          />
        </div>

        <div>
          <label className="text-lg text-base-content">{t("phone")}</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
          />
        </div>

        <div>
          <label className="text-lg text-base-content">{t("dob")}</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
          />
        </div>

        <div>
          <label className="text-lg text-base-content">{t("address")}</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            rows={2}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md resize-none"
            placeholder="Nhập địa chỉ..."
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};
