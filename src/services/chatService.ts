import axios from "./axiosClient";

export const sendMessageToAI = async (message: string) => {
  const response = await axios.post("/chat", { message });
  return response.data;
};
