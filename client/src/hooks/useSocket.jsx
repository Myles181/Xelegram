import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("https://xelegram.onrender.com");

const useSocket = () => {
  const userId = useSelector((state) => state.userReducer.user._id);

  const socketEmit = (action, payload, fn) => {
    socket.emit(action, payload, fn);
  };

  const socketListen = (action, fn) => {
    socket.on(action, fn);
  };

  return { socketEmit, socketListen, userId, socket };
};

export default useSocket;
