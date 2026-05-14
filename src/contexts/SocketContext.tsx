import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";

import { EXPO_PUBLIC_WEBSOCKET_URL } from "@env";

interface ISocketContext {
  connected: boolean;
  newMessage: any;
  sendMessage: (data: any) => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider = ({ children }: any) => {
  const { authState } = useAuth();

  const socketRef = useRef<WebSocket | null>(null);

  const [connected, setConnected] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    if (!authState?.token) return;

    const ws = new WebSocket(`${EXPO_PUBLIC_WEBSOCKET_URL}?token=${authState.token}`)

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WS conectado");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNewMessage(data);
    };

    ws.onerror = (error) => {
      console.log("WS erro", error);
    };

    ws.onclose = () => {
      console.log("WS fechado");
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [authState?.token]);

  const sendMessage = (data: any) => {
    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.log("WebSocket desconectado");
    }
  };

  return (
    <SocketContext.Provider value={{ connected, newMessage, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }

  return context;
};