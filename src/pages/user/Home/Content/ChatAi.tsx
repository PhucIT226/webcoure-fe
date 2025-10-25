import { useState, useRef, useEffect } from "react";

import { MessageCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { addUserMessage, sendChatMessage } from "../../../../redux/chatSlice";

export default function ChatWidget() {
  const dispatch = useAppDispatch();
  const { messages, loading } = useAppSelector((state) => state.chat);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    await dispatch(sendChatMessage(input));
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Nút Hỏi đáp nổi */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition"
      >
        <MessageCircle size={18} />
        Hỏi đáp
      </button>

      {/* Popup Chat */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-3">
            <span className="font-semibold">💬 Chat với AI</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 h-80 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 italic text-sm">
                AI đang suy nghĩ...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 p-2 border-t bg-white">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border rounded-full px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 disabled:bg-orange-300 text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
