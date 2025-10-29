export type Message = {
  sender: "user" | "admin" | "ai";
  text: string;
  timestamp?: Date;
  userName?: string;
};

export type UserStatus = {
  online: boolean;
  lastSeen: Date;
  isTyping?: boolean;
};

export type UserInfo = {
  id: string;
  name: string;
  email?: string;
};