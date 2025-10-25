import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaUserGraduate } from "react-icons/fa";
import { useAppSelector } from "../../../hooks";
import dayjs from "dayjs";
import { useState, useMemo, useRef, useEffect } from "react";

export const ChartNewUsers = () => {
  const monthlyNewUsers = useAppSelector(
    (state) => state.dashboard.monthlyNewUsers
  );

  // 🧩 Lưu tùy chọn hiển thị: 6 tháng, 12 tháng, hoặc tất cả
  const [monthRange, setMonthRange] = useState<6 | 12 | "all">(6);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lấy danh sách tất cả tháng có trong dữ liệu backend
  const allMonths = useMemo(
    () => monthlyNewUsers.map((item) => item.month),
    [monthlyNewUsers]
  );

  // Nếu chọn 6 hoặc 12 tháng → tính lại mốc thời gian gần nhất
  const displayedMonths =
    monthRange === "all"
      ? allMonths
      : Array.from({ length: monthRange }, (_, i) =>
          dayjs()
            .subtract(monthRange - 1 - i, "month")
            .format("YYYY-MM")
        );

  // Gắn dữ liệu vào chart, đảm bảo tháng nào chưa có count thì = 0
  const chartData = displayedMonths.map((month) => {
    const found = monthlyNewUsers.find((item) => item.month === month);
    return {
      month,
      totalUsers: found ? found.totalUsers : 0,
    };
  });

  const colors = ["#6C5DD3", "#7F56D9", "#9A70E3", "#B083ED", "#CA96F7", "#E0AAFF"];

  // 💡 Khi hiển thị nhiều tháng → cột nhỏ hơn để đủ không gian
  const barSize = monthRange === 6 ? 40 : monthRange === 12 ? 25 : 15;

  // Nhãn hiển thị hiện tại
  const labelMap = { 6: "6 tháng", 12: "12 tháng", all: "Tất cả" } as const;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 min-w-[760px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaUserGraduate className="text-blue-500 w-5 h-5" />
          <h3 className="font-semibold text-gray-800 text-lg">
            Học viên mới theo tháng
          </h3>
        </div>

        {/* 🔘 Dropdown custom */}
        <div className="relative text-sm" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="border border-gray-300 rounded-lg px-3 py-1 bg-base-100 shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 flex items-center gap-1"
          >
            {labelMap[monthRange]}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                openDropdown ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openDropdown && (
            <ul className="absolute right-0 mt-2 w-28 bg-base-100 border border-gray-200 rounded-lg shadow-md z-10 overflow-hidden">
              {([6, 12, "all"] as const).map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setMonthRange(option);
                    setOpenDropdown(false);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-amber-800 transition ${
                    monthRange === option ? "bg-blue-100 text-blue-600 font-medium" : ""
                  }`}
                >
                  {labelMap[option]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="4 3"
            stroke="#e5e7eb"
            opacity={0.7}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [value, "Học viên mới"]}
            labelStyle={{ color: "#374151", fontWeight: 500 }}
          />
          <Bar
            dataKey="totalUsers"
            radius={[5, 5, 0, 0]}
            animationDuration={800}
            barSize={barSize} // 👈 Thu nhỏ cột khi hiển thị nhiều tháng
            fillOpacity={1}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                cursor="pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
