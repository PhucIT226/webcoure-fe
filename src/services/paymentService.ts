import type { PaymentPayload } from "./../redux/paymentSlice";
// src/services/paymentService.ts
// import axios from "axios";
import axios from "./axiosClient";

export const createPayment = async (payload: PaymentPayload) => {
  const res = await axios.post("payments/create-payment-intent", payload, {
    withCredentials: false,
  });
  console.log("📨 Response from backend:", res.data);
  return res.data;
};
