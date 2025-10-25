import { useState } from "react";
// import { ProfileSettings } from "../../../components/admin/setting/Profile";
import { SystemSettings } from "../../../components/admin/setting/System";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  // { id: "profile", 
  //   label: "Thông tin cá nhân",
  //   color: "from-green-400 to-green-500",
  //   component: <ProfileSettings />
  // },
  { id: "system", 
    label: "Cài đặt chung", 
    color: "from-green-400 to-green-500", 
    component: <SystemSettings /> 
  },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("system");

  return (
    <div className="p-6 bg-base-100 min-h-screen lg:flex gap-6">
      {/* Sidebar menu */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white 
                      rounded-xl px-5 py-3 shadow-lg w-full lg:w-64 border border-gray-200 p-6">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">Cài đặt</h2>
        <ul className="space-y-3">
            {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                <li
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`cursor-pointer px-5 py-3 rounded-xl flex items-center justify-between text-md font-medium transition-all duration-300
                    ${isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                        : "bg-gray-200 text-gray-600"}`}
                >
                    {item.label}
                </li>
                );
            })}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 bg-base-100 rounded-3xl shadow-xl border border-gray-200 p-6 overflow-auto max-h-screen">
        <AnimatePresence mode="wait">
          {menuItems
            .filter((item) => item.id === activeTab)
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {item.component}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsPage;
