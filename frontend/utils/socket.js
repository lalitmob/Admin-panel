import { io } from "socket.io-client";

const socket = io("http://localhost:5003", {
  transports: ["websocket"], // Ensures WebSocket is used over polling
  withCredentials: true, // If dealing with authentication cookies
  reconnectionAttempts: 5, // Optional: retry connection up to 5 times
  reconnectionDelay: 2000, // Optional: wait 2s before retrying
});

export default socket;
