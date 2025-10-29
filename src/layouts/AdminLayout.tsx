import { useEffect, useState, useRef, type ReactNode } from "react";
import axios from "../services/axiosClient";
import {
  FaBars,
  FaUser,
  FaThLarge,
  FaGraduationCap,
  FaTags,
  FaGift,
  FaStarHalfAlt,
  FaCreditCard,
  FaRobot,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { Menu } from "../types/menu";
import type { TAny } from "../types/common";
import { useTranslation } from "react-i18next";

type AdminLayoutProps = { children: ReactNode };
type MenuType = Menu[];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<TAny[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const menu: MenuType = [
    {
      label: t("dashboard"),
      to: "",
      icon: FaThLarge,
      defaultColor: "text-blue-600",
    },
    {
      label: t("users"),
      to: "users",
      icon: FaUser,
      defaultColor: "text-green-600",
    },
    {
      label: t("courses"),
      to: "courses",
      icon: FaGraduationCap,
      defaultColor: "text-purple-600",
    },
    {
      label: t("categories"),
      to: "categories",
      icon: FaTags,
      defaultColor: "text-pink-500",
    },
    {
      label: t("orders"),
      to: "orders",
      icon: FaCreditCard,
      defaultColor: "text-orange-500",
    },
    {
      label: t("reviews"),
      to: "reviews",
      icon: FaStarHalfAlt,
      defaultColor: "text-yellow-500",
    },
    {
      label: t("coupons"),
      to: "coupons",
      icon: FaGift,
      defaultColor: "text-red-500",
    },
    {
      label: t("chatbot"),
      to: "chatbot",
      icon: FaRobot,
      defaultColor: "text-blue-500",
    },
  ];

  const [menus, setMenus] = useState(menu);

  useEffect(() => {
    const q = searchQuery.trim();
    if (q === "") {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoadingSearch(true);
        const res = await axios.get(
          `/admin/search?query=${encodeURIComponent(q)}`
        );
        setSuggestions(res.data || []);
      } catch (err) {
        console.error("❌ Lỗi khi fetch search:", err);
      } finally {
        setLoadingSearch(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelect = (item: TAny) => {
    setSuggestions([]);
    navigate(`/admin/${item.type.toLowerCase()}s/${item.id}`);
  };

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
          className="flex items-center justify-center py-6 border-b border-gray-100"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-22 w-auto -my-6 object-contain"
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
                    className={`flex items-center text-lg px-4 py-4 rounded-lg cursor-pointer group ${
                      item.active
                        ? "bg-base-100 text-[#2563eb] font-semibold"
                        : "bg-base-100 hover:bg-[#dbeafe] hover:text-[#2563eb]"
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
                              ? "bg-base-100 text-[#2563eb] font-semibold"
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
          className="fixed top-0 left-0 right-0 h-16 bg-base-100 shadow z-20 flex items-center justify-between px-6 transition-all duration-200"
          style={{
            left: sidebarOpen ? "16rem" : "5rem",
            width: sidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 5rem)",
          }}
        >
          {/* Left: Sidebar toggle */}
          <div className="flex items-center gap-4">
            <button
              className="text-2xl bg-base-100"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <FaBars />
            </button>
          </div>

          <div className="relative w-64">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring focus:ring-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && suggestions.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 w-full bg-base-100 border shadow-lg z-50 max-h-60 overflow-auto"
              >
                {loadingSearch ? (
                  <p className="p-2 text-gray-500">Đang tìm...</p>
                ) : (
                  suggestions.map((item) => (
                    <div
                      key={item.type + item.id}
                      className="p-2 cursor-pointer hover:bg-blue-100"
                      onClick={() => handleSelect(item)}
                    >
                      <span className="font-semibold">
                        {item.name || item.title || item.email}
                      </span>{" "}
                      <span className="text-gray-500 text-sm">
                        ({item.type})
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right: Settings */}
          <div className="flex items-center gap-4">
            <Link to="setting">
              <IoMdSettings className="text-2xl" />
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 pt-20 bg-base-100">{children}</main>

        {/* Footer */}
        <footer className="bg-base-100 text-center py-3 text-base-content text-sm shadow-inner">
          Copyright © {new Date().getFullYear()} Axelit.{" "}
          <span className="text-pink-400 mx-1">♥</span> v1.0.0
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
