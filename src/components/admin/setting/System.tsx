import ThemeToggle from "./ThemeToggle";

export const SystemSettings = () => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold bg-base-100 mb-4">Cấu hình hệ thống</h3>
      <div className="space-y-4">
        <div className="py-4">
          <span>Ngôn ngữ</span>
          <select className="w-full bg-base-100 mt-3 -mb-2 border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option>Tiếng Việt</option>
            <option>English</option>
          </select>
        </div>
        <div className="flex items-center py-4 justify-between">
          <span>Chế độ màn hình</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center py-4 justify-between">
          <span>Chế độ bảo trì</span>
          <input type="checkbox" className="toggle toggle-error" />
        </div>
      </div>
    </div>
  );
};
