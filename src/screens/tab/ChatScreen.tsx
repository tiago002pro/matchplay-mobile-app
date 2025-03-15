import { Feather, Ionicons } from "@expo/vector-icons";
import { Box, Image, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, SafeAreaView } from "react-native";
import { StyleSheet, Text } from "react-native";
import { THEME } from "styles/Theme";
import moment from "moment";
import { ChatService } from "service/ChatService";
import { ChatDTO } from "interfaces/IChatDTO";
import { ActivityIndicator } from "react-native-paper";
import { IApiResponse } from "interfaces/IApiResponse";
import { IPageable } from "interfaces/IPageable";

const widthScreen = Dimensions.get('screen').width;
const width = widthScreen * .2;

export function ChatScreen() {
  const { getAllByPersonId } = ChatService();
  const pageSize = 10;

  const [chatList, setChatList] = useState<ChatDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setPage(0);
    loadChats(true);
    scrollToTop();
  }, [search]);
  
  useEffect(() => {
    if (page > 0) loadChats(false)
  }, [page, search]);

  function loadChats(newSearch = false) {
    setLoading(true);

    try {
      console.log("aac");
      
      getAllByPersonId(1, search, page, pageSize).then((response:IApiResponse<IPageable<ChatDTO[]>>) => {
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

  return(
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
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
          ListFooterComponent={
            loading ? <ActivityIndicator
              size="large"
              color={THEME.colors.primary}
              style={{marginTop: 300}}
              />
            : null
          }
          renderItem={({item}) => {
            return(
              <View style={styles.chatContainer}>
                <View style={styles.imageContainer}>
                  {
                    !item?.image && <View style={styles.circle}></View>
                  }
                  <Ionicons
                    name="person-circle-outline"
                    size={width}
                    color={THEME.colors.primary}
                  />
                  {
                    item?.image && <Image source={{ uri: item?.image }} alt={'profileImage'} style={styles.userImage} />
                  }
                </View>
                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.lastMessage} numberOfLines={2}>{item.lastMessage}</Text>
                  <Text style={styles.date} numberOfLines={2}>{convertDate(item.dateLastMessage)}</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Box style={styles.btnMore}>
                    <Feather
                      name="more-vertical"
                      size={width * .4}
                      color={THEME.colors.primary}
                    />
                  </Box>
                </View>
                <View style={styles.containerLine}>
                  <View style={styles.line}></View>
                </View>
              </View>
            );
          }}
        />
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
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.background,
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
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMore: {
    borderRadius: '50%',
    padding: 5,
    backgroundColor: "rgba(171, 104, 248, 0.12)",
  },
  circle: {
    borderRadius: width - width * .27,
    width: width - width * .27,
    height: width - width * .27,
    borderWidth: width * .03,
    borderColor: THEME.colors.background,
    zIndex: 999999,
    position: 'absolute',
  },
  userImage: {
    width: width - width * .20,
    height: width - width * .20,
    borderRadius: width - width * .20,
    position: 'absolute',
  },
  info: {
    width: widthScreen - (width * 2) - (THEME.sizes.paddingPage * 2),
    flexDirection: 'column',
    gap: 5,
  },
  name: {
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.font,
    fontWeight: 500,
  },
  lastMessage: {
    fontSize: THEME.fontSizes.md - 3,
    color: THEME.colors.font,
    opacity: .9,
  },
  date: {
    fontSize: THEME.fontSizes.sm - 5,
    color: THEME.colors.font,
    opacity: .7,
  },
  containerLine: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  line: {
    width: widthScreen * .75,
    borderBottomWidth: 1,
    borderColor: THEME.colors.font,
    opacity: .7,
  },
});
