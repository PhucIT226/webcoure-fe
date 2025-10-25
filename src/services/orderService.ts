import axios from "./axiosClient";
import type { Order, OrderResDto, GetAllOrderParams } from "../types/order";

const OrderService = {
  async getAll(params?: GetAllOrderParams): Promise<OrderResDto> {
    const res = await axios.get<OrderResDto>("/orders", { params });
    return res.data;
  },

  async getById(id: string): Promise<Order> {
    const res = await axios.get(`/orders/${id}`);
    return res.data.data;
  },

  async create(order: Partial<Order>): Promise<Order> {
    const res = await axios.post<{ status: boolean; message: string; data: Order }>(
      "/orders",
      order,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data.data;
  },

  async update(id: string, order: Partial<Order>): Promise<Order> {
    const res = await axios.patch<{ status: boolean; message: string; data: Order }>(
      `/orders/${id}`,
      order,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/orders/${id}`);
  },
};

export default OrderService;
