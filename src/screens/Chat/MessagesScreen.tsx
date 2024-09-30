import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { THEME } from "../../styles/Theme";
import { useAuth } from "../../context/AuthContext";
import { MessageService } from "../../service/MessageService";
import { Message } from "../../interface/message.interface";
import { Client, Stomp } from "@stomp/stompjs";

const widthScreen = Dimensions.get('screen').width;
var client:Client;

export function MessagesScreen({ route }:any) {
  const { authState } = useAuth();
  const { saveMessage, getAll } = MessageService();
  const [person, setPerson] = useState<any>(authState?.user);
  const [friend, setFriend] = useState<any>(route?.params?.friend);
  const [messages, setMessages] = useState<any>([]);
  const { getToken } = useAuth();

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // const intervalId = setInterval(getMessages, 1000)
    // return () => clearInterval(intervalId);
    const token = getToken();
    console.log("token", token);
    const ws = new WebSocket(`ws://10.0.0.101:8080/chat/websocket?Bearer=${token}`);

    ws.onopen = () => {
      console.log('Conectado ao WebSocket');
      setSocket(ws);

      const newMessage:Message = {
        senderId: person.id,
        recipientId: friend.id,
        text: 'aaaaaaaaaaaaa',
        date: new Date(),
        read: false,
      };

      ws.send(JSON.stringify(newMessage));
      console.log("ws", ws);
      
    };

    ws.onmessage = (event) => {
      console.log("onmessage",event );
      
      const message = JSON.parse(event.data);
      setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
    };

    ws.onerror = (error) => {
      console.log('Erro no WebSocket:', error);
    };

    // Evento de conexão fechada
    ws.onclose = () => {
      console.log('WebSocket fechado');
    };

    return () => {
      ws.close();
    };

    // connectWebSocket()
  }, [])

  async function connectWebSocket() {
    const token = getToken();

    client = new Client({
      brokerURL: `ws://10.0.0.101:8080/chat/websocket?Bearer=${token}`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('WebSocket connected');
      },
      debug: (str) => {
        console.log("str", str);
      },
      reconnectDelay: 5000, // Tenta reconectar após 5 segundos
    });
  
    client.activate();
  };

  async function getMessages() {
    const response:any[] = await getAll(person.id, friend.id)
    
    const fetchedMessages:IMessage[] = response.map((m:Message) => ({
      _id: m.id,
      text: m.text,
      createdAt: m.date,
      user: {
        _id: m.senderId,
        name: m.senderId == person.id ? person.name : friend.name,
        avatar: m.senderId == person.id ? person.profileImage : friend.profileImage,
      }
    })) as IMessage[];

    setMessages(fetchedMessages)
  }

  const onSend = useCallback(async (messages:IMessage[] = []) => {
    if (messages.length > 0) {
      setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
    }

    const newMessage:Message = {
      senderId: person.id,
      recipientId: friend.id,
      text: messages[0].text,
      date: new Date(),
      read: false,
    };

    console.log("socket", socket);
    

    socket?.send("aaaaaaaaaaaaaa");

    

    // client.publish({
    //   destination: `/1`, // Rota de envio para o destinatário
    //   body: JSON.stringify(newMessage),
    // });
    // await saveMessage(newMessage)
  }, []);

  return(
    <View style={styles.container}>
      <GiftedChat
        messagesContainerStyle={{
          width: widthScreen - 20,
        }}
        messages={messages}
        onSend={(messages:any) => onSend(messages)}
        user={{
          _id: person?.id,
          name: person.name,
        }}
        placeholder="Digite uma mensagem..."
        alwaysShowSend={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
  },
});