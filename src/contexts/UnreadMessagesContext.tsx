import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

const UnreadMessagesContext = createContext(null);

export const UnreadMessagesProvider = ({ children }) => {
  const { newMessage } = useSocket();
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    if (!newMessage) return;

    setUnreadCount((prev) => prev + 1)
  }, [newMessage]);

  return (
    <UnreadMessagesContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

export const useUnreadMessages = () => useContext(UnreadMessagesContext);
