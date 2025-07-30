import { Image, View } from "native-base";
import React, { useRef, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { THEME } from "styles/Theme";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import { IApiResponse } from "interfaces/IApiResponse";
import { IPageable } from "interfaces/IPageable";
import { useFocusEffect } from "@react-navigation/native";
import { MatchersDTO } from "interfaces/IMatch";
import { MatchService } from "service/MatchService";
import { MatchStatus } from "enums/MatchStatus";
import { MatchedStatus } from "enums/MatchedStatus";
import { useAuth } from "contexts/AuthContext";
import { GradientBackground } from "components/GradientBackground";
import { Heart, Star, Trash2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

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

  const getMatchIcon = (matchType: MatchStatus) => {
    switch (matchType) {
      case MatchStatus.SUPERLIKE:
        return <Star size={16} color="#06B6D4" />;
      default:
        return <Heart size={16} color="#10B981" />;
    }
  };

  const renderMatch = ({ item }) => (
    <View style={styles.matchCard}>
      <LinearGradient
        colors={
          !!item.matchType && item.matchType == MatchStatus.SUPERLIKE
            ? ['rgba(44, 0, 240, 0.29)', 'rgba(202, 16, 171, 0.45)']
            : ['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.05)']
        }
        style={styles.matchCardGradient}
      >
        <View style={styles.matchHeader}>
          <View style={styles.avatarContainer}>
            <Image source={require('./../../../assets/images/hacker.png')} alt={'profileImage'} style={styles.avatar} />
            { item?.image && <Image source={{ uri: item?.image }} alt={'profileImage'} style={styles.avatar} /> }
            <View style={styles.onlineIndicator} />
            <View style={styles.matchTypeIndicator}>
              {getMatchIcon(item.matchType)}
            </View>
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

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.chatButton}
              onPress={() => manage(item, MatchedStatus.ACCEPTED)}
            >
              <Heart size={20} color="#8B5CF6" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.unmatchButton}
              onPress={() => manage(item, MatchedStatus.DANIED)}
            >
              <Trash2 size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
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
        <Heart size={40} color="#FFFFFF" />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Nenhum match ainda</Text>
      <Text style={styles.emptyText}>
        Continue deslizando para encontrar seu parceiro de jogo perfeito!
      </Text>
    </View>
  );

  return(
    <SafeAreaView style={styles.container}>
      <GradientBackground>
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
          ListFooterComponent={renderLoading}
          renderItem={renderMatch}
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
