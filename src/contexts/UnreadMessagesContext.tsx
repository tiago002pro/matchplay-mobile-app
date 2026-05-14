import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";

interface Props {
  children: ReactNode;
}

interface UnreadMessagesContextData {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const UnreadMessagesContext =
  createContext<UnreadMessagesContextData>({} as UnreadMessagesContextData);

export const UnreadMessagesProvider = ({ children }: Props) => {
  const { newMessage } = useSocket();
  const { authState } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!newMessage?.id) return;

    if (newMessage.senderId === authState?.user?.personId) {
      return;
    }

    setUnreadCount((prev) => prev + 1);
  }, [newMessage]);

  return (
    <UnreadMessagesContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

export const useUnreadMessages = () => useContext(UnreadMessagesContext);
