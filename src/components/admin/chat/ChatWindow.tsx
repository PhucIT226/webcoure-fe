import React from "react";
import type { Message, UserStatus } from "../../../types/chat";

type Props = {
  currentUserId: string | null;
  userChats: Map<string, Message[]>;
  userStatuses: Map<string, UserStatus>;
  input: string;
  setInput: (v: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  formatTime: (d: Date) => string;
  getUserName: (id: string) => string;
};

export default function ChatWindow({
  currentUserId,
  userChats,
  userStatuses,
  input,
  setInput,
  handleInputChange,
  handleKeyPress,
  handleSend,
  messagesEndRef,
  formatTime,
  getUserName,
}: Props) {
  return (
    <div className="flex-1 flex flex-col bg-base-100 p-4">
      <div className="mb-2">
        <h2 className="font-bold text-lg">
          {currentUserId ? `Chat với: ${getUserName(currentUserId)}` :
           "Chọn user để chat"}
        </h2>

        {currentUserId && userStatuses.get(currentUserId) && (
          <p className="text-sm text-gray-500">
            {userStatuses.get(currentUserId)?.online
              ? "🟢 Đang online"
              : `🔴 Hoạt động ${formatTime(
                  userStatuses.get(currentUserId)!.lastSeen
                )}`}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto border p-2 mb-2 bg-base-300 rounded-md">
        {currentUserId &&
          (userChats.get(currentUserId) || []).map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "admin" ? "justify-end" : "justify-start"
              } mb-1`}
            >
              <div
                className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow ${
                  msg.sender === "admin"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

        {currentUserId && userStatuses.get(currentUserId)?.isTyping && (
          <div className="flex justify-start mb-1">
            <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-2xl rounded-bl-none text-sm">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }} />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="flex-1 border rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!currentUserId}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 text-sm"
          disabled={!currentUserId}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}