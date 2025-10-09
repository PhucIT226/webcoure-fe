import axios from "./axiosClient";
import type { Order, OrderResDto, GetAllOrderParams } from "../types/order";

const OrderService = {
  async getAll(params?: GetAllOrderParams): Promise<OrderResDto> {
    const res = await axios.get<OrderResDto>("/orders", { params });
    return res.data;
  },

  async getById(id: string): Promise<Order> {
    const res = await axios.get<Order>(`/orders/${id}`);
    return res.data;
  },

  async create(order: Partial<Order>): Promise<Order> {
    const res = await axios.post<Order>("/orders", order);
    return res.data;
  },

  async update(id: string, order: Partial<Order>): Promise<Order> {
    const res = await axios.put<Order>(`/orders/${id}`, order);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/orders/${id}`);
  },
};

export default OrderService;
