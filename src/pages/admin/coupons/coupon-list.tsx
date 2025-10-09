import { useEffect, useState } from "react";

type Voucher = {
  id: number;
  code: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder?: number; // giá trị đơn hàng tối thiểu
  usageLimit: number; // số lần tối đa
  used: number; // số lần đã dùng
  startDate: string;
  endDate: string;
  status: "active" | "inactive";
};

export default function VoucherListPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setVouchers([
      {
        id: 1,
        code: "NEWYEAR",
        name: "Khuyến mãi Tết",
        type: "percentage",
        value: 10,
        minOrder: 500000,
        usageLimit: 100,
        used: 15,
        startDate: "2025-01-01",
        endDate: "2025-01-31",
        status: "active",
      },
      {
        id: 2,
        code: "SUMMER5",
        name: "Giảm hè 50k",
        type: "fixed",
        value: 50000,
        minOrder: 0,
        usageLimit: 50,
        used: 20,
        startDate: "2025-06-01",
        endDate: "2025-06-30",
        status: "inactive",
      },
    ]);
  }, []);

  const filteredVouchers = vouchers.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Quản lý Voucher</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          />
          <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">
            Tìm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Mã</th>
              <th className="px-4 py-3">Tên voucher</th>
              <th className="px-4 py-3">Loại</th>
              <th className="px-4 py-3">Giá trị</th>
              <th className="px-4 py-3">Đơn hàng tối thiểu</th>
              <th className="px-4 py-3">Sử dụng</th> {/* 15/100 */}
              <th className="px-4 py-3">Ngày bắt đầu</th>
              <th className="px-4 py-3">Ngày kết thúc</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{v.id}</td>
                <td className="px-4 py-2 font-medium">{v.code}</td>
                <td className="px-4 py-2">{v.name}</td>
                <td className="px-4 py-2">{v.type === "percentage" ? "%" : "VNĐ"}</td>
                <td className="px-4 py-2">
                  {v.type === "percentage" ? v.value + "%" : v.value.toLocaleString() + "đ"}
                </td>
                <td className="px-4 py-2">{v.minOrder?.toLocaleString() || 0}đ</td>
                <td className="px-4 py-2">
                  {v.used}/{v.usageLimit}
                </td>
                <td className="px-4 py-2">{v.startDate}</td>
                <td className="px-4 py-2">{v.endDate}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      v.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {v.status === "active" ? "Hoạt động" : "Ngừng"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                    Sửa
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {filteredVouchers.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-4 text-center text-gray-500">
                  Không có voucher nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
