import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sendMessageToAI } from "../services/chatService";
import type { TAny } from "../types/common";

type ChatMessage = {
  sender: "user" | "ai";
  text: string;
};

type ChatState = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
};

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

// Async thunk gửi message
export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message: string, { rejectWithValue }) => {
    try {
      const data = await sendMessageToAI(message);
      return data.reply;
    } catch (error: TAny) {
      return rejectWithValue(error.response?.data?.message || "Lỗi server");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({ sender: "user", text: action.payload });
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ sender: "ai", text: action.payload });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addUserMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
