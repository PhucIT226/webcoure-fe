import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchProfile, updateProfile } from "../../../../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import { getThumbnailUrl } from "../../../../utils/getThumbnailUrl";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "courses">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Lấy profile từ Redux
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useAppSelector((state) => state.profile);
  // ✅ Lấy các khóa học đang hoạt động (active)
  const seenIds = new Set();
  const activeCourses =
    profile?.orders
      ?.filter(
        (order) => order.status === "paid" || order.paymentStatus === "paid"
      )
      .flatMap((order) => order.items ?? [])
      .filter((item) => {
        const id = item.course?.id;
        if (!id || seenIds.has(id)) return false; // nếu chưa có id hoặc bị trùng
        seenIds.add(id); // thêm id vào danh sách đã thấy
        return true; // giữ lại item này
      }) ?? [];
  console.log(activeCourses);

  // ✅ Fetch profile khi load trang
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // ✅ Khi có profile thì set form
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        dateOfBirth: profile.dob || "",
      });
    }
  }, [profile]);

  // ✅ Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Lưu thay đổi
  const handleSave = () => {
    const updated = {
      name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      dob: formData.dateOfBirth,
    };
    dispatch(updateProfile({ profile: updated }));
    setIsEditing(false);
  };

  // ✅ Loading / error / empty handling
  if (profileLoading)
    return <p className="text-center mt-10 text-gray-600">Đang tải hồ sơ...</p>;
  if (profileError)
    return (
      <p className="text-center mt-10 text-red-500">Lỗi: {profileError}</p>
    );
  if (!profile)
    return (
      <p className="text-center mt-10 text-gray-600">Không có dữ liệu hồ sơ.</p>
    );

  const user = {
    name: profile.name,
    email: profile.email || "",
    location: profile.address || "Đà Nẵng, Việt Nam",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Tài khoản</h2>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setActiveTab("profile")}
            className={`text-left px-3 py-2 rounded-lg transition ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            🧍 Hồ sơ
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`text-left px-3 py-2 rounded-lg transition ${
              activeTab === "courses"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            📚 Khoá học của tôi
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        {activeTab === "profile" ? (
          // ==================== TAB HỒ SƠ ====================
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-5 border-t pt-4 text-sm text-gray-500">
                  <p>📍 {user.location}</p>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa hồ sơ</h2>
                <div className="flex flex-col gap-3 text-left">
                  <label>
                    Họ và tên:
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                  <label>
                    Số điện thoại:
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                  <label>
                    Địa chỉ:
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                  <label>
                    Ngày sinh:
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full border p-2 rounded mt-1"
                    />
                  </label>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Hủy
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          // ==================== TAB KHÓA HỌC ====================
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">📚 Khoá học của tôi</h2>

            {activeCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {activeCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform overflow-hidden cursor-pointer"
                    onClick={() =>
                      navigate(`/coursevid/${course.course.id}`, {
                        state: { courseId: course.course.id },
                      })
                    }
                  >
                    {/* Ảnh khoá học */}
                    <div className="relative">
                      <img
                        src={getThumbnailUrl(course.course)}
                        alt={course.course.title}
                        className="w-full h-44 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                        ★ 4.7
                      </div>
                    </div>

                    {/* Nội dung khoá học */}
                    <div className="p-4 flex flex-col justify-between h-[160px]">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                          {course.course.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {course.course.shortDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Bạn chưa mua khoá học nào.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
