import axios from "./axiosClient";

export const getAdminChatHistory = async () => {
  const response = await axios.get("/chat/admin/history");
  return response.data;
};

export const getUserChatHistory = async () => {
  const response = await axios.get("/chat/user/history");
  return response.data;
};