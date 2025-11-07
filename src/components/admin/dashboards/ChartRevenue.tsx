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
import { useMemo } from "react";
import dayjs from "dayjs";

export const ChartRevenue = () => {
  const { revenueStats, loading } = useAppSelector((state) => state.dashboard);

  // Cố định: hiển thị 6 tháng gần nhất
  const displayedMonths = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) =>
      dayjs().subtract(5 - i, "month").format("YYYY-MM")
    );
  }, []);

  // Chuẩn hóa dữ liệu theo months cố định
  const data = useMemo(
    () =>
      displayedMonths.map((month) => {
        const found = revenueStats.find((item) => item.month === month);
        return { month, revenue: found ? found.totalRevenue : 0 };
      }),
    [displayedMonths, revenueStats]
  );

  return (
    <div className="p-4 rounded border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">
          📈 Doanh thu theo tháng
        </h3>
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
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
