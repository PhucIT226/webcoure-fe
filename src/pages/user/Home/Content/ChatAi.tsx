import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../../../hooks";
import { getUserChatHistory } from "../../../../services/chatService";
import { useUserChatSocket } from "./hooks/useUserChatSocket";
import ChatPanel from "../../../../components/ui/ChatPanel";

type Message = { sender: "user" | "admin" | "ai"; text: string };

export default function ChatWidget() {
  const { user } = useAppSelector((s) => s.auth);
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [adminTyping, setAdminTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!open || !user?.id) return;
    const load = async () => {
      try {
        setLoading(true);
        const { messages: history } = await getUserChatHistory();
        setMessages(history);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      } catch (error) {
        console.error("❌ Lỗi load lịch sử:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [open, user?.id]);

  const s = useUserChatSocket(user?.id, user?.name);
  useEffect(() => {
    if (!s) return;
    setSocket(s);

    s.on("receiveMessage", ({ text }: { text: string }) => {
      setMessages((prev) => [...prev, { sender: "admin", text }]);
    });

    s.on("userTyping", ({ isTyping }: { isTyping: boolean }) => {
      setAdminTyping(isTyping);
    });

    return () => {
      s.off("receiveMessage");
      s.off("userTyping");
    };
  }, [s]);

  const handleSend = () => {
    if (!input.trim() || !socket || !user?.id) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    socket.emit("sendMessage", {
      senderId: user.id,
      receiverRole: "admin",
      targetUserId: "admin01",
      text: input,
    });
    socket.emit("typing", { userId: user.id, isTyping: false });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!socket || !user?.id) return;
    socket.emit("typing", { userId: user.id, isTyping: true });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { userId: user.id, isTyping: false });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, adminTyping]);

  return (
    <ChatPanel
      open={open}
      setOpen={setOpen}
      loading={loading}
      messages={messages}
      adminTyping={adminTyping}
      input={input}
      setInput={setInput}
      handleInputChange={handleInputChange}
      handleKeyPress={handleKeyPress}
      handleSend={handleSend}
      messagesEndRef={messagesEndRef}
    />
  );
}