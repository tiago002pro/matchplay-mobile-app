import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { IMessageDTO } from "interfaces/IMessage";

import { EXPO_PUBLIC_WEBSOCKET_URL } from "@env";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { authState } = useAuth();
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState<IMessageDTO>(null);

  useEffect(() => {
    if (!authState?.user?.personId) return; // Só conecta se o usuário estiver logado

    let ws = new WebSocket(`${EXPO_PUBLIC_WEBSOCKET_URL}?userId=${authState?.user?.personId}`);

    ws.onopen = () => console.log("✅ Conectado ao WebSocket!");
    ws.onmessage = (event) => {
      const data: IMessageDTO = JSON.parse(event.data);
      console.log("📩 Nova mensagem recebida:", data);
      setNewMessage(data);
    };
    ws.onerror = (error) => console.error("❌ Erro no WebSocket:", error);
    ws.onclose = () => console.log("🔌 Conexão WebSocket fechada.");

    setSocket(ws);

    return () => {
      console.log("⚠️ Fechando conexão WebSocket...");
      ws.close();
    };
  }, [authState?.user?.personId]);

  return (
    <SocketContext.Provider value={{ socket, newMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
