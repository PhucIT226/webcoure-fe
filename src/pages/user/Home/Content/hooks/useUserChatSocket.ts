import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketURL = import.meta.env.VITE_SOCKET_URL ||
  "http://localhost:3000";

export function useUserChatSocket(userId?: string, userName?: string) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;
    const s = io(socketURL, { withCredentials: true });
    setSocket(s);

    s.on("connect", () => {
      console.log("✅ User connected:", s.id);
      s.emit("join", { userId, role: "user", userName });
    });

    return () => {
      s.disconnect();
    };
  }, [userId, userName]);

  return socket;
}