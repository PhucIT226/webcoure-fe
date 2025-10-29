import { useState, useEffect, useRef } from "react";
import { getAdminChatHistory } from "../../../services/chatService";
import { useAdminChatSocket } from "./hooks/useAdminChatSocket";
import type { Message, UserInfo, UserStatus } from "../../../types/chat";
import UserList from "../../../components/admin/chat/UserList";
import ChatWindow from "../../../components/admin/chat/ChatWindow";

export default function AdminChat() {
  const [userChats, setUserChats] = useState(new Map<string, Message[]>());
  const [userStatuses, setUserStatuses] = useState(new Map<string, UserStatus>());
  const [userInfos, setUserInfos] = useState(new Map<string, UserInfo>());
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // load history
  useEffect(() => {
    const load = async () => {
      try {
        const { chats } = await getAdminChatHistory();
        const chatMap = new Map<string, Message[]>();
        const infoMap = new Map<string, UserInfo>();
        const statusMap = new Map<string, UserStatus>();

        Object.entries(chats).forEach(([userId, messages]) => {
          const msgs = messages as Message[];
          chatMap.set(userId, msgs);
          const firstMsg = msgs.find((m) => m.userName);
          if (firstMsg?.userName) {
            infoMap.set(userId, { id: userId, name: firstMsg.userName });
          }
          const lastMsg = msgs[msgs.length - 1];
          if (lastMsg?.timestamp) {
            statusMap.set(userId, { online: false, lastSeen: new Date(lastMsg.timestamp) });
          }
        });

        setUserChats(chatMap);
        setUserInfos(infoMap);
        setUserStatuses(statusMap);
        setLoading(false);
      } catch (error) {
        console.error("❌ Lỗi load lịch sử:", error);
        setLoading(false);
      }
    };

    load();
  }, []);

  // socket setup via hook
  const socket = useAdminChatSocket({
    onReceiveMessage: ({ senderId, text, timestamp, userName }) => {
      setUserChats((prev) => {
        const newMap = new Map(prev);
        const chat = newMap.get(senderId) || [];
        newMap.set(senderId, [
          ...chat,
          { sender: "user", text, timestamp: timestamp ? new Date(timestamp) : undefined, userName },
        ]);
        return newMap;
      });

      if (userName) {
        setUserInfos((prev) => {
          const newMap = new Map(prev);
          if (!newMap.has(senderId)) {
            newMap.set(senderId, { id: senderId, name: userName });
          }
          return newMap;
        });
      }

      setUserStatuses((prev) => {
        const newMap = new Map(prev);
        const current = newMap.get(senderId);
        newMap.set(senderId, {
          online: current?.online || false,
          lastSeen: new Date(),
        });
        return newMap;
      });

      setCurrentUserId((prev) => prev || senderId);
    },

    onUserOnline: ({ userId, online, userName }) => {
      setUserStatuses((prev) => {
        const newMap = new Map(prev);
        newMap.set(userId, { online, lastSeen: new Date() });
        return newMap;
      });

      if (userName) {
        setUserInfos((prev) => {
          const newMap = new Map(prev);
          if (!newMap.has(userId)) {
            newMap.set(userId, { id: userId, name: userName });
          }
          return newMap;
        });
      }
    },

    onUserOffline: ({ userId, online, lastSeen }) => {
      setUserStatuses((prev) => {
        const newMap = new Map(prev);
        const parsedLastSeen = lastSeen ? new Date(lastSeen) : new Date();
        newMap.set(userId, { online, lastSeen: parsedLastSeen });
        return newMap;
      });
    },

    onUserTyping: ({ userId, isTyping }) => {
      setUserStatuses((prev) => {
        const newMap = new Map(prev);
        const status = newMap.get(userId) || { online: false, lastSeen: new Date() };
        newMap.set(userId, { ...status, isTyping });
        return newMap;
      });
    },
  });

  const userList = Array.from(userChats.keys());

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Hôm qua";
    if (days < 7) return `${days} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  const getUserName = (userId: string) => {
    return userInfos.get(userId)?.name || `User ${userId.slice(0, 8)}`;
  };

  const handleSend = () => {
    if (!input.trim() || !currentUserId) return;
    const message: Message = { sender: "admin", text: input,
      timestamp: new Date() };

    setUserChats((prev) => {
      const newMap = new Map(prev);
      const chat = newMap.get(currentUserId) || [];
      newMap.set(currentUserId, [...chat, message]);
      return newMap;
    });

    // emit via socket returned from hook
    socket?.emit?.("sendMessage", {
      senderId: "admin01",
      receiverRole: "user",
      targetUserId: currentUserId,
      text: input,
    });

    socket?.emit?.("typing", { userId: "admin01", isTyping: false });

    setInput("");
  };

  // typing logic same as before
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!currentUserId) return;

    socket?.emit?.("typing", { userId: "admin01", isTyping: true });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit?.("typing", { userId: "admin01", isTyping: false });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userChats, currentUserId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Đang tải lịch sử chat...</p>
      </div>
    );
  }

  return (
    <div className="flex max-w-4xl mx-auto mt-10 border rounded-lg shadow-lg h-[600px] overflow-hidden">
      <UserList
        userList={userList}
        userChats={userChats}
        userStatuses={userStatuses}
        userInfos={userInfos}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        getUserName={getUserName}
        formatTime={formatTime}
      />

      <ChatWindow
        currentUserId={currentUserId}
        userChats={userChats}
        userStatuses={userStatuses}
        input={input}
        setInput={setInput}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleSend={handleSend}
        messagesEndRef={messagesEndRef}
        formatTime={formatTime}
        getUserName={getUserName}
      />
    </div>
  );
}