import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext"; 

const API_URL: string = import.meta.env.VITE_API_BASE_URL as string;

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn,currentUserId } = useAuthContext(); 
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isLoggedIn && currentUserId) {
      const newSocket = io(API_URL);
       newSocket.emit("mark online",currentUserId);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect(); 
      };
    } else {
      setSocket(null); 
    }
  }, [isLoggedIn,currentUserId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
