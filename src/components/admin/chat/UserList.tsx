import React from "react";
import type { UserInfo, UserStatus, Message } from "../../../types/chat";

type Props = {
  userList: string[];
  userChats: Map<string, Message[]>;
  userStatuses: Map<string, UserStatus>;
  userInfos: Map<string, UserInfo>;
  currentUserId: string | null;
  setCurrentUserId: (id: string | null) => void;
  getUserName: (id: string) => string;
  formatTime: (d: Date) => string;
};

export default function UserList({
  userList,
  userChats,
  userStatuses,
  userInfos,
  currentUserId,
  setCurrentUserId,
  getUserName,
  formatTime,
}: Props) {
  return (
    <div className="w-1/4 border-r overflow-y-auto bg-base-200">
      <h3 className="font-bold p-2 border-b">
        Người dùng ({userList.length})
      </h3>

      {userList.map((userId) => {
        const status = userStatuses.get(userId);
        const lastMsg = userChats.get(userId)?.slice(-1)[0];

        return (
          <div
            key={userId}
            className={`p-2 cursor-pointer hover:bg-gray-200 border-b ${
              userId === currentUserId ? "bg-gray-300 font-semibold" : ""
            }`}
            onClick={() => setCurrentUserId(userId)}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  status?.online ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <span className="flex-1 truncate font-medium">
                {getUserName(userId)}
              </span>
            </div>

            {lastMsg && (
              <div className="text-xs text-base-content ml-4 truncate">
                {lastMsg.sender === "admin" ? "Bạn: " : ""}
                {lastMsg.text}
              </div>
            )}

            <div className="text-xs text-base-content ml-4">
              {status?.online
                ? "🟢 Đang online"
                : status?.lastSeen
                ? `🔴 ${formatTime(status.lastSeen)}`
                : "Chưa có hoạt động"}
            </div>
          </div>
        );
      })}
    </div>
  );
}