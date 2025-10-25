import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../../hooks";
import { useState, useMemo, useRef, useEffect } from "react";
import dayjs from "dayjs";

export const ChartRevenue = () => {
  const { revenueStats, loading } = useAppSelector((state) => state.dashboard);

  // 🧩 State hiển thị dropdown
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

  // Lấy danh sách tất cả tháng từ backend
  const allMonths = useMemo(
    () => revenueStats.map((item) => item.month),
    [revenueStats]
  );

  // Tính danh sách tháng hiển thị
  const displayedMonths =
    monthRange === "all"
      ? allMonths
      : Array.from({ length: monthRange }, (_, i) =>
          dayjs()
            .subtract(monthRange - 1 - i, "month")
            .format("YYYY-MM")
        );

  // Chuẩn hóa dữ liệu
  const data = displayedMonths.map((month) => {
    const found = revenueStats.find((item) => item.month === month);
    return { month, revenue: found ? found.totalRevenue : 0 };
  });

  // Nhãn hiển thị hiện tại
  const labelMap = { 6: "6 tháng", 12: "12 tháng", all: "Tất cả" } as const;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 min-w-[760px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">
          📈 Doanh thu theo tháng
        </h3>

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
                  className={`px-3 py-2 cursor-pointer hover:bg-amber-700 transition ${
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

      <span className="text-sm text-gray-500 block mb-3">
        (đơn vị: <span className="font-medium text-gray-700">VNĐ</span>)
      </span>

      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-500 text-sm animate-pulse">Đang tải biểu đồ...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
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
              tickFormatter={(val) => `${(val / 1_000_000).toFixed(1)}M`}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ stroke: "#60a5fa", strokeDasharray: "4 2" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              formatter={(value: number) => [
                `₫${value.toLocaleString("vi-VN")}`,
                "Doanh thu",
              ]}
              labelStyle={{ color: "#374151", fontWeight: 500 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#3b82f6",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{
                r: 7,
                fill: "#2563eb",
                strokeWidth: 3,
                stroke: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
