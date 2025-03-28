import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, View } from "native-base";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { THEME } from "styles/Theme";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import { IApiResponse } from "interfaces/IApiResponse";
import { IPageable } from "interfaces/IPageable";
import { useFocusEffect } from "@react-navigation/native";
import { EmptyData } from "components/EmptyData";
import { MatchersDTO } from "interfaces/IMatch";
import { MatchService } from "service/MatchService";
import { MatchStatus } from "enums/MatchStatus";
import { MatchedStatus } from "enums/MatchedStatus";
import { useAuth } from "contexts/AuthContext";

const widthScreen = Dimensions.get('screen').width;
const width = widthScreen * .2;

export function MatchersScreen() {
  const { authState } = useAuth();
  const { searchMatchers, manageMatches } = MatchService();
  const pageSize = 10;

  const [machersList, setMachersList] = useState<MatchersDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const listRef = useRef<FlatList>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (page > 0) {
        loadMatchers(false)
      }
      else {
        setPage(0);
        loadMatchers(true);
        scrollToTop();
      }
    }, [page, search])
  );
  

  function loadMatchers(newSearch = false) {
    setLoading(true);
    try {
      const statusList: MatchStatus[] = [MatchStatus.LIKE, MatchStatus.SUPERLIKE];
      searchMatchers(authState?.user?.personId, statusList, page, pageSize).then((response:IApiResponse<IPageable<MatchersDTO[]>>) => {
        if (response && response.result && response.result.content && response.result.content.length) {
          setMachersList((prev) => newSearch ?  response.result.content : [...prev, ...response.result.content]);
          setHasMore(!response.result.last)
        }
      })
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function manage(matchersDTO: MatchersDTO, matchedStatus: MatchedStatus) {
    setLoading(true);
    try {
      await manageMatches(matchersDTO.id, matchedStatus)
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
      setMachersList((prevList) => prevList.filter((matcher) => matcher.id !== matchersDTO.id));
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
          data={machersList}
          keyExtractor={(item:MatchersDTO) => String(item.id)}
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
                  <Image source={require('./../../../assets/images/hacker.png')} alt={'profileImage'} style={styles.userImage} />
                  {
                    item?.image && <Image source={{ uri: item?.image }} alt={'profileImage'} style={styles.userImage} />
                  }
                </View>
                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.date} numberOfLines={2}>{convertDate(item.dateLastMessage)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.dislikeButton} onPress={() => manage(item, MatchedStatus.DANIED)}>
                    <MaterialCommunityIcons name="google-controller-off" size={40} color={THEME.colors.red[400]} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.likeButton} onPress={() => manage(item, MatchedStatus.ACCEPTED)}>
                    <MaterialCommunityIcons name="google-controller" size={40} color={THEME.colors.green[500]} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        <EmptyData 
          dataList={machersList}
          title="Opss..."
          text="Você ainda não teve nenhum match."
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
    flexDirection: 'row',
    paddingStart: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage, 
    paddingTop: (THEME.sizes.paddingPage * 2),
    paddingBottom: (THEME.sizes.paddingPage * 2),
    borderWidth: 1,
    borderColor: THEME.colors.primary,
    marginBottom: THEME.sizes.paddingPage,
    borderRadius: THEME.sizes.paddingPage,
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: width - width * .20,
    height: width - width * .20,
    borderRadius: width - width * .20,
    position: 'absolute',
    backgroundColor: THEME.colors.primary,
  },
  info: {
    width: widthScreen - (width * 2) - (THEME.sizes.paddingPage * 2) - (100 - THEME.sizes.paddingPage * 2),
    flexDirection: 'column',
    gap: 7,
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
  buttonContainer: {
    flexDirection: "row",
    width: 100,
  },
  dislikeButton: {
    justifyContent: `center`,
    alignItems: 'flex-end',
    width: 50,
  },
  likeButton: {
    justifyContent: `center`,
    alignItems: 'flex-end',
    width: 50,
  },
});
