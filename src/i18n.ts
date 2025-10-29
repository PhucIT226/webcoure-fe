import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  vi: {
    translation: {
        // Sidebar
        dashboard: "Bảng điều khiển",
        users: "Người dùng",
        courses: "Khóa học",
        categories: "Danh mục",
        orders: "Đơn hàng",
        reviews: "Đánh giá",
        coupons: "Voucher",
        chatbot: "Chat",
        searchPlaceholder: "Tìm kiếm...",
        searching: "Đang tìm...",

        // --- System Settings ---
        settings: "Cài đặt",
        system: "Cài đặt chung",
        profile: "Thông tin cá nhân",
        systemSettings: "Cấu hình hệ thống",
        language: "Ngôn ngữ",
        darkMode: "Chế độ màn hình",
        maintenanceMode: "Chế độ bảo trì",
        maintenanceOn: "Đã bật chế độ bảo trì",
        maintenanceOff: "Đã tắt chế độ bảo trì",
        loading: "Đang tải...",

        // --- Profile Settings ---
        profileTitle: "Thông tin cá nhân",
        displayName: "Tên hiển thị",
        phone: "Số điện thoại",
        dob: "Ngày sinh",
        address: "Địa chỉ",
        addressPlaceholder: "Nhập địa chỉ...",
        saveChanges: "Lưu thay đổi",
        saving: "Đang lưu...",
        uploadPhoto: "Đổi ảnh đại diện",
        profileUpdated: "Cập nhật thông tin thành công",
        profileUpdateError: "Lỗi khi cập nhật thông tin",
        profileNotFound: "Không tìm thấy thông tin người dùng",
        profileLoadError: "Không thể tải thông tin cá nhân",
        loadingProfile: "Đang tải thông tin...",
    },
  },
  en: {
    translation: {
        // Sidebar
        dashboard: "Dashboard",
        users: "Users",
        courses: "Courses",
        categories: "Categories",
        orders: "Orders",
        reviews: "Reviews",
        coupons: "Coupons",
        chatbot: "Chat",
        searchPlaceholder: "Search...",
        searching: "Searching...",

        // --- System Settings ---
        settings: "Settings",
        system: "General Settings",
        profile: "Profile",
        systemSettings: "System Settings",
        language: "Language",
        darkMode: "Display Mode",
        maintenanceMode: "Maintenance Mode",
        maintenanceOn: "Maintenance mode enabled",
        maintenanceOff: "Maintenance mode disabled",
        loading: "Loading...",

        // --- Profile Settings ---
        profileTitle: "Profile Information",
        displayName: "Display Name",
        phone: "Phone Number",
        dob: "Date of Birth",
        address: "Address",
        addressPlaceholder: "Enter your address...",
        saveChanges: "Save Changes",
        saving: "Saving...",
        uploadPhoto: "Change Avatar",
        profileUpdated: "Profile updated successfully",
        profileUpdateError: "Error updating profile",
        profileNotFound: "User information not found",
        profileLoadError: "Failed to load profile",
        loadingProfile: "Loading profile...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "vi",
  fallbackLng: "vi",
  interpolation: { escapeValue: false },
});

export default i18n;
