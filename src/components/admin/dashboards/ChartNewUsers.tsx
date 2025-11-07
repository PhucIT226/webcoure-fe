import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaUserGraduate } from "react-icons/fa";
import { useAppSelector } from "../../../hooks";
import dayjs from "dayjs";
import { useMemo } from "react";

export const ChartNewUsers = () => {
  const monthlyNewUsers = useAppSelector(
    (state) => state.dashboard.monthlyNewUsers
  );

  const displayedMonths = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) =>
      dayjs().subtract(5 - i, "month").format("YYYY-MM")
    );
  }, []);

  const chartData = useMemo(
    () =>
      displayedMonths.map((month) => {
        const found = monthlyNewUsers.find((item) => item.month === month);
        return { month, totalUsers: found ? found.totalUsers : 0 };
      }),
    [displayedMonths, monthlyNewUsers]
  );

  return (
    <div className="p-4 rounded border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaUserGraduate className="text-blue-500 w-5 h-5" />
          <h3 className="font-semibold text-gray-800 text-lg">
            Học viên mới theo tháng
          </h3>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="4 3" stroke="#e5e7eb" vertical={false} />
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

          <Tooltip />

          <Bar dataKey="totalUsers" radius={[5, 5, 0, 0]} fill="#6C5DD3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
