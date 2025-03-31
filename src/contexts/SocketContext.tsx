import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { IMessageDTO } from "interfaces/IMessage";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { authState } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authState?.user?.personId) return; // Só conecta se o usuário estiver logado

    let ws = new WebSocket(`ws://api.matchplay.cloud:9091/api/matchplay/buildrun-livechat-websocket?userId=${authState?.user?.personId}`);

    ws.onopen = () => console.log("✅ Conectado ao WebSocket!");
    ws.onmessage = (event) => {
      const data: IMessageDTO = JSON.parse(event.data);
      console.log("📩 Nova mensagem recebida:", data);
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
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
