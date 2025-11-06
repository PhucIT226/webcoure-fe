import React from "react";
import { MessageCircle } from "lucide-react";
import type { Message } from "../../types/chat";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  loading: boolean;
  messages: Message[];
  adminTyping: boolean;
  input: string;
  setInput: (v: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSend: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
};

export default function ChatPanel({
  open,
  setOpen,
  loading,
  messages,
  adminTyping,
  input,
  handleInputChange,
  handleKeyPress,
  handleSend,
  messagesEndRef,
}: Props) {
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
      >
        <MessageCircle size={18} />
        Hỏi đáp
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50">
          <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-3 flex-shrink-0">
            <span className="font-semibold">💬 Chat với Admin</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-xl leading-none">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3" style={{ maxHeight: "calc(500px - 120px)", scrollBehavior: "smooth" }}>
            {loading ? (
              <div className="text-center text-gray-500 py-4">Đang tải lịch sử...</div>
            ) : (
              <>
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">Bắt đầu cuộc trò chuyện với admin</div>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow ${msg.sender === "user" ? "bg-orange-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}

                {adminTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 px-3 py-2 rounded-2xl rounded-bl-none text-sm">
                      <span className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="flex gap-2 p-2 border-t bg-white flex-shrink-0">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="flex-1 border rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              disabled={loading}
            />
            <button onClick={handleSend} className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !input.trim()}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}