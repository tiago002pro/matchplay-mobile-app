import { GradientBackground } from "components/GradientBackground";
import { useAuth } from "contexts/AuthContext";
import { useSocket } from "contexts/SocketContext";
import { useUnreadMessages } from "contexts/UnreadMessagesContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { IApiResponse } from "interfaces/IApiResponse";
import { ChatDTO } from "interfaces/IChatDTO";
import { IMessageDTO } from "interfaces/IMessage";
import { IPageable } from "interfaces/IPageable";
import { ArrowLeft, MoreVertical, Paperclip, Phone, Send, Smile, Video } from "lucide-react-native";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MessageService } from "service/MessageService";
import { THEME } from "styles/Theme";

export default function MessageScreen({ route }:any) {
  const navigation = useNavigation();
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

  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  
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
      console.error("Não foi possível carregar as mensagens:", error);
    } finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }

  const handleNewMessage = () => {
    if (inputText.trim()) {
      const data = {
        chatId: chat.id,
        senderId,
        senderName: senderName,
        content: inputText
      };

      const message:IMessageDTO = {
        id: null,
        senderId,
        content: inputText,
        isRead: false,
        date: new Date().toDateString(),
        chatId: chat.id,
      }

      setMessages((prevMessages) => [message, ...prevMessages]);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      setInputText('');
      socket.send(JSON.stringify(data));
    }
  };

  function convertDate(date) {
    return moment(new Date(date)).calendar(); 
  }

  const renderMessage = ({ item }: { item: IMessageDTO }) => {
    const isMe = item.senderId === senderId;
    
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.otherBubble]}>
          <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
            {item.content}
          </Text>
          <Text style={[styles.messageTime, isMe ? styles.myMessageTime : styles.otherMessageTime]}>
            {convertDate(item.date)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Ajuste para o iOS
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.headerInfo}>
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{ senderName }</Text>
                <Text style={styles.headerStatus}>
                  {true ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={20} color="#8B5CF6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Video size={20} color="#8B5CF6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MoreVertical size={20} color="#8B5CF6" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            inverted={true}
            data={messages}
            keyExtractor={(item:IMessageDTO, index) => String(index)}
            renderItem={renderMessage}
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
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
          />

          {isTyping && (
            <View style={styles.typingContainer}>
              <Text style={styles.typingText}>{ senderName } está digitando...</Text>
            </View>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inputContainer}
          >
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.inputButton}>
                <Paperclip size={20} color="#8B5CF6" />
              </TouchableOpacity>
              

              <TextInput
                style={styles.textInput}
                placeholder="Digite uma mensagem..."
                placeholderTextColor="#666"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={255}
              />
              
              <TouchableOpacity style={styles.inputButton}>
                <Smile size={20} color="#8B5CF6" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.sendButton, (!inputText.trim() || sending) && styles.sendButtonDisabled]}
                onPress={handleNewMessage}
                disabled={!inputText.trim() || sending}
              >
                <LinearGradient
                  colors={inputText.trim() && !sending ? ['#8B5CF6', '#EC4899'] : ['#666', '#666']}
                  style={styles.sendButtonGradient}
                >
                  {sending ? (
                    <ActivityIndicator size={16} color="#FFFFFF" />
                  ) : (
                    <Send size={20} color="#FFFFFF" />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
  },
  backButton: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    marginBottom: THEME.sizes.paddingPage / 2,
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  myBubble: {
    backgroundColor: '#8B5CF6',
    borderBottomRightRadius: 6,
  },
  otherBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#999',
  },
  typingContainer: {
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8B5CF6',
    fontStyle: 'italic',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
    paddingVertical: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  inputButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
