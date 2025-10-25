// import { useEffect, useState } from "react";
// import { FaCamera } from "react-icons/fa";
// import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { fetchProfile, updateProfile } from "../../../redux/profileSlice";

// export const ProfileSettings = () => {
//   const dispatch = useAppDispatch();
//   const profile = useAppSelector((state) => state.profile.data);
//   const loading = useAppSelector((state) => state.profile.loading);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dob: "",
//     address: "",
//     avatar: "",
//     file: null as File | null,
//   });

//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         name: profile.name,
//         email: profile.email,
//         phone: profile.phone || "",
//         dob: profile.dob || "",
//         address: profile.address || "",
//         avatar: profile.avatarUrl || "",
//         file: null,
//       });
//     }
//   }, [profile]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setFormData((prev) => ({ ...prev, avatar: url, file }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { file, ...data } = formData;
//     dispatch(updateProfile({ profile: data, file: file || undefined }));
//   };

//   return (
//     <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//       <h1 className="font-semibold text-gray-800 text-center text-3xl mb-4">Thông tin cá nhân</h1>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Avatar */}
//         <div className="flex flex-col items-center gap-3">
//           <div className="relative w-24 h-24 rounded-full overflow-hidden">
//             <img
//               src={formData.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//               alt="Avatar"
//               className="w-full h-full object-cover"
//             />
//             <label
//               htmlFor="avatarUpload"
//               className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-all cursor-pointer rounded-full"
//             >
//               <FaCamera className="text-white text-lg" />
//             </label>
//             <input
//               id="avatarUpload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleAvatarChange}
//             />
//           </div>
//           <div className="text-center">
//             <p className="font-medium text-gray-700 text-lg">{formData.name}</p>
//             <p className="text-md text-gray-500">{formData.email}</p>
//           </div>
//         </div>

//         {/* Các field */}
//         {["name", "email", "phone", "dob"].map((key) => (
//           <div key={key}>
//             <label className="text-lg text-gray-600">{key === "dob" ? "Ngày sinh" : key === "phone" ? "Số điện thoại" : key === "name" ? "Tên hiển thị" : "Email"}</label>
//             <input
//               type={key === "email" ? "email" : key === "dob" ? "date" : "text"}
//               name={key}
//               value={formData[key as keyof typeof formData] || ""}
//               onChange={handleChange}
//               className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md"
//               placeholder={key}
//             />
//           </div>
//         ))}

//         <div>
//           <label className="text-lg text-gray-600">Địa chỉ</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             rows={2}
//             className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-md resize-none"
//             placeholder="Nhập địa chỉ..."
//           ></textarea>
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
//           >
//             {loading ? "Đang lưu..." : "Lưu thay đổi"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
