import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// Determine base URL based on environment
const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://xelegram.onrender.com"
  : "http://localhost:4000";  // Use the local server URL for development

// Create socket instance lazily inside the hook
const useSocket = () => {
  const userId = useSelector((state) => state.userReducer.user._id);
  const socket = io(BASE_URL, { transports: ["websocket"] });

  // Establish the connection when component mounts
  useEffect(() => {
    if (userId) {
      console.log("Connecting socket...");
      socket.connect();
    }

    // Clean up on unmount
    return () => {
      console.log("Disconnecting socket...");
      socket.disconnect();
    };
  }, [userId]); // Only re-run if userId changes

  const socketEmit = (action, payload, fn) => {
    if (socket.connected) {
      socket.emit(action, payload, fn);
    } else {
      console.warn("Socket not connected.");
    }
  };

  const socketListen = (action, fn) => {
    socket.on(action, fn);

    // Clean up listener when unmounted
    return () => {
      socket.off(action, fn);
    };
  };

  return { socketEmit, socketListen, userId, socket };
};

export default useSocket;
