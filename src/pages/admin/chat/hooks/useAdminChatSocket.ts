import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketURL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

type Handlers = {
  onReceiveMessage: (payload: {
    senderId: string;
    text: string;
    timestamp?: string | Date;
    userName?: string;
  }) => void;
  onUserOnline: (payload: {
    userId: string;
    online: boolean;
    userName?: string;
  }) => void;
  onUserOffline: (payload: {
    userId: string;
    online: boolean;
    lastSeen?: string | Date;
  }) => void;
  onUserTyping: (payload: { userId: string; isTyping: boolean }) => void;
};

export function useAdminChatSocket(h: Handlers) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io(socketURL, { withCredentials: true });
    setSocket(s);

    s.on("connect", () => {
      console.log("✅ Admin connected:", s.id);
      s.emit("join", { userId: "admin01", role: "admin" });
    });

    s.on("receiveMessage", h.onReceiveMessage);
    s.on("userOnline", h.onUserOnline);
    s.on("userOffline", h.onUserOffline);
    s.on("userTyping", h.onUserTyping);

    return () => {
      console.log("🔌 Admin disconnecting...");
      s.disconnect();
    };
    // intentionally run once
  }, []);

  return socket;
}
