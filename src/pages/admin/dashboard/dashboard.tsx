import { useState } from "react";
import {
  FaUser,
  FaUserTie,
  FaGraduationCap,
  FaCreditCard,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";
import type { Menu } from "../../../types/menu";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

type MenuType = Menu & { defaultColor: string; value?: number };

const menu: MenuType[] = [
  {
    label: "Khóa học",
    to: "product-list",
    icon: FaGraduationCap,
    defaultColor: "text-blue-600",
    children: [],
    value: 30,
  },
  {
    label: "Học viên",
    to: "user-list",
    icon: FaUser,
    defaultColor: "text-green-600",
    children: [],
    value: 350,
  },
  {
    label: "Giảng viên",
    to: "category-list",
    icon: FaUserTie,
    defaultColor: "text-purple-600",
    children: [],
    value: 40,
  },
  {
    label: "Đơn hàng",
    to: "tag-list",
    icon: FaCreditCard,
    defaultColor: "text-orange-500",
    children: [],
    value: 85,
  },
];

const incomeData = [
  { date: "2024-08-01", value: 1200 },
  { date: "2024-08-02", value: 1800 },
  { date: "2024-08-03", value: 900 },
  { date: "2024-08-04", value: 2200 },
  { date: "2024-08-05", value: 1500 },
  { date: "2024-08-06", value: 1700 },
  { date: "2024-08-07", value: 2100 },
];

const latestOrders = [
  { id: "ORD001", student: "Nguyễn Văn A", course: "ReactJS Cơ bản", amount: "$50", status: "Paid" },
  { id: "ORD002", student: "Trần Thị B", course: "Node.js Nâng cao", amount: "$70", status: "Pending" },
  { id: "ORD003", student: "Lê Văn C", course: "UI/UX Design", amount: "$40", status: "Paid" },
];

const reviewData = {
  labels: ["5⭐", "4⭐", "3⭐"],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: ["#34d399", "#60a5fa", "#fbbf24"],
      borderWidth: 2,
    },
  ],
};

function Dashboard() {
  const [dateRange, setDateRange] = useState({
    from: "2024-08-01",
    to: "2024-08-07",
  });

  const filteredIncome = incomeData.filter(
    (d) => d.date >= dateRange.from && d.date <= dateRange.to
  );

  const chartData = {
    labels: filteredIncome.map((d) => d.date),
    datasets: [
      {
        label: "Doanh thu ($)",
        data: filteredIncome.map((d) => d.value),
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-2xl bg-white flex flex-col items-center justify-center py-8 transition hover:scale-105 hover:shadow-lg"
            >
              <span className={`text-4xl mb-3 ${item.defaultColor}`}>
                <Icon />
              </span>
              <span className="text-2xl font-extrabold text-gray-800">
                {item.value ?? 0}
              </span>
              <span className="text-sm mt-1 text-gray-600">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2">
              <FaChartLine /> Phân tích doanh thu
            </h2>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="input input-bordered"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange((r) => ({ ...r, from: e.target.value }))
                }
                max={dateRange.to}
              />
              <input
                type="date"
                className="input input-bordered"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange((r) => ({ ...r, to: e.target.value }))
                }
                min={dateRange.from}
              />
            </div>
          </div>
          <Line
  data={{
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        fill: true, // tạo vùng màu
        backgroundColor: "rgba(139, 92, 246, 0.2)", // màu nền area
        borderColor: "rgba(139, 92, 246, 1)",       // màu viền line
      },
    ],
  }}
  options={{
    responsive: true,
    plugins: { legend: { display: false } },
    elements: { line: { tension: 0.3 } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "#f3f1fe" } },
    },
  }}
/>


        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-yellow-600 flex items-center gap-2 mb-6">
            <FaStar /> Thống kê đánh giá
          </h2>
          <div className="w-64 mx-auto">
            <Doughnut
              data={reviewData}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
        <h2 className="text-lg font-bold text-indigo-600 mb-6">
          Đơn hàng mới nhất
        </h2>
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>Mã đơn</th>
              <th>Học viên</th>
              <th>Khóa học</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="font-bold">{order.id}</td>
                <td>{order.student}</td>
                <td>{order.course}</td>
                <td>{order.amount}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
