import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "contexts/AuthContext";
import { useSocket } from "contexts/SocketContext";
import { useUnreadMessages } from "contexts/UnreadMessagesContext";
import { IApiResponse } from "interfaces/IApiResponse";
import { ChatDTO } from "interfaces/IChatDTO";
import { IMessageDTO } from "interfaces/IMessage";
import { IPageable } from "interfaces/IPageable";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MessageService } from "service/MessageService";
import { THEME } from "styles/Theme";

export default function MessageScreen({ route }:any) {
  const { authState } = useAuth();
  const { socket, newMessage } = useSocket();
  const { setUnreadCount } = useUnreadMessages();

  const { getMessages, readAllMessages, getUnreadCount } = MessageService();
  const pageSize = 10;
  const chat: ChatDTO = route.params.chat;
  const senderId = authState.user.personId;
  const senderName = authState.user.name;

  const [messages, setMessages] = useState<IMessageDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState("");
  
  useEffect(() => {
    if (page > 0) loadMessages(false);
    else loadMessages(true);
  }, [page]);

  useEffect(() => {
    if (!newMessage) return;
  
    if (newMessage.chatId === chat.id) {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    }
  }, [newMessage, chat.id]);

  useEffect(() => {
    readAllMessages(chat.id, chat.personId).then(() => {});
    getUnreadCount(senderId).then((response) => {
      setUnreadCount(response.result)
    })
  }, [messages]);

  function loadMessages(newSearch = false) {
    setLoading(true);

    try {
      getMessages(chat.id, page, pageSize).then((response:IApiResponse<IPageable<IMessageDTO[]>>) => {
        if (response && response.result && response.result.content && response.result.content.length) {
          setMessages((prev) => newSearch ?  response.result.content : [...prev, ...response.result.content]);
          setHasMore(!response.result.last)
        }
      })
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }

  const sendMessage = () => {
    if (inputText.trim()) {
      const data = {
        chatId: chat.id,
        senderId,
        senderName: senderName,
        content: inputText
      };

      const newMessage:IMessageDTO = {
        id: null,
        senderId,
        content: inputText,
        isRead: false,
        date: new Date().toDateString(),
        chatId: chat.id,
      }

      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setInputText("");
      socket.send(JSON.stringify(data));
    }
  };

  function convertDate(date) {
    return moment(new Date(date)).calendar(); 
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Ajuste para o iOS
      >
        <FlatList
          data={messages}
          inverted={true}
          style={styles.flatListContainer}
          keyExtractor={(item:IMessageDTO, index) => String(index)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={pageSize}
          maxToRenderPerBatch={pageSize}
          removeClippedSubviews={true}
          ListFooterComponent={
            loading ? <ActivityIndicator
              size="large"
              color={THEME.colors.primary}
              style={{marginTop: 300}}
              />
            : null
          }
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <View style={[styles.message, item.senderId === senderId ? styles.userMessage : styles.otherMessage]}>
                <Text style={styles.messageText}>{item.content}</Text>
              </View>
              <View style={[styles.readContainer, item.senderId === senderId ? {justifyContent: 'flex-end'} : {justifyContent: 'flex-start'}]}>
                <Text style={[styles.dateText, item.senderId === senderId ? {textAlign: "right"} : {textAlign: "left"}]}>{convertDate(item.date)}</Text>
                {
                  item.senderId === senderId
                    && <Ionicons
                      name={item.isRead ? "checkmark-done" : "checkmark"}
                      size={15}
                      color={item.isRead ? THEME.colors.secondary : THEME.colors.font}
                    />
                }
              </View>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite uma mensagem..."
            cursorColor={THEME.colors.font}
            selectionColor={THEME.colors.font}
            placeholderTextColor={THEME.colors.font}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.background,
  },
  flatListContainer: {
    marginBottom: THEME.sizes.paddingPage / 2,
  },
  messageContainer: {
    gap: 0
  },
  message: {
    width: "77%",
    padding: THEME.sizes.paddingPage,
    marginVertical: THEME.sizes.paddingPage / 2,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: THEME.colors.secondary,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: THEME.colors.gray[800],
  },
  messageText: {
    color: THEME.colors.font,
  },
  readContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  dateText: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.sm - 4,
    marginRight: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: THEME.colors.font,
    borderRadius: 8,
    marginRight: 10,
    color: THEME.colors.font,
    padding: THEME.sizes.paddingPage / 2,
  },
  sendButton: {
    backgroundColor: THEME.colors.primary,
    borderRadius: 8,
    padding: THEME.sizes.paddingPage / 2,
  },
  sendButtonText: {
    color: THEME.colors.font,
    fontWeight: "bold",
  },
  noMessagesText: {
    borderColor: THEME.colors.font,
  },
});
