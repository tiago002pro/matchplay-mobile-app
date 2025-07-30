import { Image, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { THEME } from "styles/Theme";
import moment from "moment";
import { ChatService } from "service/ChatService";
import { ChatDTO } from "interfaces/IChatDTO";
import { ActivityIndicator } from "react-native-paper";
import { IApiResponse } from "interfaces/IApiResponse";
import { IPageable } from "interfaces/IPageable";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "contexts/AuthContext";
import { useSocket } from "contexts/SocketContext";
import { GradientBackground } from "components/GradientBackground";
import { LinearGradient } from "expo-linear-gradient";
import { MessageCircle } from "lucide-react-native";

const widthScreen = Dimensions.get('screen').width;
const width = widthScreen * .2;

export function ChatScreen() {
  const navigation:any = useNavigation();
  const { authState } = useAuth();
  const { newMessage } = useSocket();
  const { getAllByPersonId } = ChatService();
  const pageSize = 10;

  const [chatList, setChatList] = useState<ChatDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const listRef = useRef<FlatList>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (page > 0) {
        loadChats(false)
      }
      else {
        setPage(0);
        loadChats(true);
        scrollToTop();
      }
    }, [page, search])
  );

  useEffect(() => {
    if (!newMessage) return;

    setChatList((prev) =>
      prev.map((item) =>
        item.personId === newMessage.senderId
          ? {
              ...item,
              unreadCount: item.unreadCount + 1,
              lastMessage: newMessage.content,
              dateLastMessage: newMessage.date,
            }
          : item
      )
    );
  }, [newMessage]);

  function loadChats(newSearch = false) {
    setLoading(true);

    try {
      getAllByPersonId(authState?.user?.personId, search, page, pageSize).then((response:IApiResponse<IPageable<ChatDTO[]>>) => {
        if (response && response.result && response.result.content && response.result.content.length) {
          setChatList((prev) => newSearch ?  response.result.content : [...prev, ...response.result.content]);
          setHasMore(!response.result.last)
        }
      })
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
  }

  function scrollToTop() {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }

  function convertDate(date) {
    return moment(new Date(date)).startOf('hour').fromNow(); 
  }

  function goToMessage(chat:ChatDTO) {
    navigation.navigate('MessageScreen', {
      chat: chat
    });
  }

  const renderChat = ({ item }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => goToMessage(item)}
    >
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.05)']}
        style={styles.matchCardGradient}
      >
        <View style={styles.matchHeader}>
          <View style={styles.avatarContainer}>
            <Image source={require('./../../../assets/images/hacker.png')} alt={'profileImage'} style={styles.avatar} />
            { item?.image && <Image source={{ uri: item?.image }} alt={'profileImage'} style={styles.avatar} /> }
            {
              item.unreadCount > 0 &&
              <View style={styles.notification}>
                <Text style={styles.notificationText}>{item.unreadCount.toString()}</Text>
              </View>
            }
            <View style={styles.onlineIndicator} />
          </View>

          <View style={styles.matchInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.matchName}>
                {item.name}
              </Text>
              <Text style={styles.timestamp}>
                {convertDate(new Date())}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderLoading = () => (
    loading ?
      <ActivityIndicator
        size="large"
        color={THEME.colors.primary}
        style={{marginTop: 300}}
      />
      : null
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={['#8B5CF6', '#EC4899']}
        style={styles.emptyIcon}
      >
        <MessageCircle size={40} color="#FFFFFF" />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Opss...</Text>
      <Text style={styles.emptyText}>
        Você ainda não falou com ninguem!
      </Text>
    </View>
  );

  return(
    <SafeAreaView style={styles.container}>
      <GradientBackground>
        <FlatList
          ref={listRef}
          data={chatList}
          keyExtractor={(item:ChatDTO) => String(item.id)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3} // Carrega apenas 10 itens inicialmente
          maxToRenderPerBatch={pageSize} //Define o número máximo de itens que serão renderizados em cada ciclo de renderização.
          removeClippedSubviews={true} // Economiza memória ao remover itens fora da tela
          ListFooterComponent={renderLoading}
          renderItem={renderChat}
          ListEmptyComponent={renderEmptyState}
        />
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  text: {
    color: THEME.colors.font,
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },

  matchCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  matchCardGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  notification: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: THEME.colors.primary,
    borderRadius: width - width * .7,
    width: width - width * .7,
    height: width - width * .7,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    fontSize: 12,
    fontWeight: "bold",
    color: THEME.colors.font,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  matchTypeIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  matchInfo: {
    flex: 1,
    marginRight: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  chatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  unmatchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 40,
  },
});
