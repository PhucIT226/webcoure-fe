// src/services/paymentService.ts
// import axios from "axios";
import axios from "./axiosClient";

export const createPayment = async (payload: {
  courseId: string;
  userId: string;
  orderId?: string;
}) => {
  const res = await axios.post("payments/create-payment-intent", payload, {
    withCredentials: true,
  });
  console.log("📨 Response from backend:", res.data);
  return res.data;
};
