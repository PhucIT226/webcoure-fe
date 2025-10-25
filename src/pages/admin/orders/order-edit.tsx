import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderForm from "../../../components/admin/orders/OrderForm.tsx";
import OrderService from "../../../services/orderService";
import type { Order } from "../../../types/order";

export default function OrderEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await OrderService.getById(id!);
        setOrder(res);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy đơn hàng");
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data: Partial<Order>) => {
    try {
      await OrderService.update(id!, data);
      alert("Cập nhật đơn hàng thành công!");
      navigate("/admin/orders");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật đơn hàng");
    }
  };

  if (!order) return <p className="p-6 text-gray-600">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow">
      <h1 className="text-3xl text-center font-extrabold text-indigo-600 tracking-wide mb-4">
        Cập nhật đơn hàng
      </h1>
      <OrderForm initialData={order} onSubmit={handleUpdate} />
    </div>
  );
}
