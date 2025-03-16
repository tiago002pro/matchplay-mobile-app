import { IApiResponse } from "interfaces/IApiResponse";
import { ChatDTO } from "interfaces/IChatDTO";
import { IMessageDTO } from "interfaces/IMessage";
import { IPageable } from "interfaces/IPageable";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MessageService } from "service/MessageService";
import { THEME } from "styles/Theme";

export default function MessageScreen({ route }:any) {
  const { getMessages } = MessageService();
  const pageSize = 15;
  const chat: ChatDTO = route.params.chat;
  const senderId = 1

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState<IMessageDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState("");
  
  useEffect(() => {
    conectWebSocket();
    if (page > 0) loadMessages(false);
    else loadMessages(true);
  }, [page]);

  function conectWebSocket() {
    const ws = new WebSocket("ws://api.matchplay.cloud:9091/api/matchplay/buildrun-livechat-websocket?userId=1");
    ws.onopen = () => console.log("Conectado ao WebSocket!");

    ws.onmessage = (event) => {
      const data:IMessageDTO = JSON.parse(event.data);
      setMessages((prevMessages) => [data, ...prevMessages]);
    };

    ws.onerror = (error) => console.log("Erro no WebSocket:", error);
    ws.onclose = () => console.log("Conexão WebSocket fechada.");

    setSocket(ws);

    return () => ws.close();
  }

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
        senderId: 1,
        content: inputText
      };

      const newMessage:IMessageDTO = {
        id: null,
        senderId: 1,
        content: inputText,
        read: false,
        date: new Date().toDateString(),
      }

      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setInputText("");
      socket.send(JSON.stringify(data));
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
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
            <View style={[styles.message, item.senderId === senderId ? styles.userMessage : styles.otherMessage]}>
              <Text style={styles.messageText}>{item.content}</Text>
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
            selectionColor={THEME.colors.secondary}
            placeholderTextColor={THEME.colors.font}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: THEME.sizes.paddingPage,
  },
  sendButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sendButtonText: {
    color: THEME.colors.font,
    fontWeight: "bold",
  },
  noMessagesText: {
    borderColor: THEME.colors.font,
  },
});
