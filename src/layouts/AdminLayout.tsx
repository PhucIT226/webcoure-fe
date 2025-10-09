import { useEffect, useState, type ReactNode } from "react";
import {
  FaBars,
  FaChevronDown,
  FaThLarge,
  FaUser,
  FaUserTie,
  FaGraduationCap,
  FaRegBell,
  FaRegCommentDots,
  FaTags,
  FaGift,
  FaUserCog,
  FaStarHalfAlt,
  FaCreditCard,
} from "react-icons/fa";
import ThemeToggle from "../components/admin/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import type { Menu } from "../types/menu";
import type { TAny } from "../types/common";
import SearchBar from "../components/admin/SearchBar";

type AdminLayoutProps = {
  children: ReactNode;
};

type MenuType = Menu[];

const menu: MenuType = [
  {
    label: "Dashboard",
    to: "",
    icon: FaThLarge,
    defaultColor: "text-gray-600",
    badge: 4,
  },
  {
    label: "Khóa học",
    to: "course-list",
    icon: FaGraduationCap,
    defaultColor: "text-blue-600",
    children: [],
  },
  {
    label: "Học viên",
    to: "student-list",
    icon: FaUser,
    defaultColor: "text-green-600",
    children: [],
  },
  {
    label: "Giảng viên",
    to: "instructor-list",
    icon: FaUserTie,
    defaultColor: "text-purple-600",
    children: [],
  },
  {
    label: "Danh mục",
    to: "category-list",
    icon: FaTags,
    defaultColor: "text-pink-500",
    children: [],
  },
  {
    label: "Đơn hàng",
    to: "order-list",
    icon: FaCreditCard,
    defaultColor: "text-orange-500",
    children: [],
  },
  {
    label: "Đánh giá",
    to: "review-list",
    icon: FaStarHalfAlt,
    defaultColor: "text-yellow-500",
    children: [],
  },
  {
    label: "Voucher",
    to: "coupon-list",   
    icon: FaGift,       
    defaultColor: "text-red-500",
    children: [],
  },
  {
    label: "Cài đặt",
    to: "profile",
    icon: FaUserCog,
    defaultColor: "text-gray-500",
    children: [],
  },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menus, setMenus] = useState(menu);
  const location = useLocation();

  useEffect(() => {
    setMenus((prevMenus: TAny) =>
      prevMenus.map((item: Menu) => {
        return {
          ...item,
          active:
            (item.to && location.pathname.includes(item.to)) ||
            (!item.to && location.pathname === "/admin"),
        };
      })
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-base-100 text-base-content shadow-lg border-r border-base-300 transition-all duration-200 z-30 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-6 border-b border-gray-100"
        >
          <img
            src="https://phpstack-1384472-5196432.cloudwaysapps.com/assets/images/logo/1.png"
            alt="Logo"
            className="h-8"
          />
        </Link>

        {/* Menu */}
        <nav className="flex-1 flex flex-col px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menus.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer group ${
                      item.active
                        ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                        : "text-gray-700 hover:bg-[#dbeafe] hover:text-[#2563eb]"
                    }`}
                  >
                    <Icon
                      className={`text-lg mr-3 transition-colors ${
                        item.active
                          ? "text-blue-600"
                          : `${item.defaultColor} group-hover:text-blue-600`
                      }`}
                    />
                    <span
                      className={`flex-1 truncate ${
                        sidebarOpen ? "inline-block" : "hidden"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>

                  {/* Submenu */}
                  {item.children && item.children.length > 0 && sidebarOpen && (
                    <ul className="ml-10 mt-1 space-y-1">
                      {item.children.map((sub) => (
                        <li
                          key={sub.label}
                          className={`px-3 py-1 rounded cursor-pointer text-sm ${
                            sub.active
                              ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                              : "text-gray-600 hover:bg-[#dbeafe] hover:text-[#2563eb]"
                          }`}
                        >
                          {sub.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-200"
        style={{
          marginLeft: sidebarOpen ? "16rem" : "5rem",
        }}
      >
        {/* Header */}
        <header
          className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-20 flex items-center justify-between px-6 transition-all duration-200"
          style={{
            left: sidebarOpen ? "16rem" : "5rem",
            width: sidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 5rem)",
          }}
        >
          <div className="flex items-center gap-4">
            <button
              className="text-2xl text-gray-600"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <FaBars />
            </button>
            <SearchBar placeholder="Tìm kiếm..." />
          </div>
          <div className="flex items-center gap-4">
            <FaRegBell className="text-gray-400 text-lg cursor-pointer" />
            <ThemeToggle />
            <img
              src="https://flagcdn.com/us.svg"
              alt="US"
              className="w-6 h-6 rounded-full border"
            />
            <FaRegCommentDots className="text-gray-400 text-lg cursor-pointer" />
            <Link to="profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-blue-200"
              />
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 pt-20 bg-[#f9fafb]">{children}</main>

        {/* Footer */}
        <footer className="bg-white text-center py-3 text-gray-500 text-sm shadow-inner mt-auto">
          Copyright © {new Date().getFullYear()} Axelit.{" "}
          <span className="text-pink-400 mx-1">♥</span> v1.0.0
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;