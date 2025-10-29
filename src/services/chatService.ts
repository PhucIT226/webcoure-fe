import axios from "./axiosClient";

export const sendMessageToAI = async (message: string) => {
  const response = await axios.post("/chat", { message });
  return response.data;
};

export const getAdminChatHistory = async () => {
  const response = await axios.get("/chat/admin/history");
  return response.data;
};

export const getUserChatHistory = async () => {
  const response = await axios.get("/chat/user/history");
  return response.data;
};