import { io } from "socket.io-client";
import { SOCKET_URL } from "../constants";

export function useSocket() {
  return {
    socket: io(SOCKET_URL, {
      autoConnect: false,
    }),
  };
}
