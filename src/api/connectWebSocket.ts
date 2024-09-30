import { useAuth } from "../context/AuthContext";
import { Client } from '@stomp/stompjs';

const connectWebSocket = async () => {
  const { getToken } = useAuth();

  const token = getToken();

  const client = new Client({
    brokerURL: 'wss://10.0.0.101:8080/chat',
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    onConnect: () => {
      console.log('WebSocket connected');
    },
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000, // Tenta reconectar após 5 segundos
  });

  client.activate();
};

export default connectWebSocket;