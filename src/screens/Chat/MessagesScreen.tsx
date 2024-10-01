import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { THEME } from "../../styles/Theme";
import { useAuth } from "../../context/AuthContext";
import { ChatService } from "../../service/ChatService";
import { Chat } from "../../interface/chat.interface";

const widthScreen = Dimensions.get('screen').width;

export function MessagesScreen({ route }:any) {
  const { authState } = useAuth();
  const { saveMessage, getAll } = ChatService();
  const [person, setPerson] = useState<any>(authState?.user);
  const [friend, setFriend] = useState<any>(route?.params?.friend);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const intervalId = setInterval(getMessages, 1000)
    return () => clearInterval(intervalId);
  }, [])

  async function getMessages() {
    const response:any[] = await getAll(person.id, friend.id)
    
    const fetchedMessages:IMessage[] = response.map((m:Chat) => ({
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

    const newMessage:Chat = {
      sequence: 1,
      senderId: person.id,
      recipientId: friend.id,
      text: messages[0].text,
      date: new Date(),
      read: false,
    };
    await saveMessage(newMessage)
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