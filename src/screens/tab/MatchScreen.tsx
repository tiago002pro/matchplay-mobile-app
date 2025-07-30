import { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList } from "native-base";

import { THEME } from "styles/Theme";
import { MatchCard } from "components/MatchCard";

import { useAuth } from "../../contexts/AuthContext";
import { PersonService } from "../../service/PersonService";
import { MatchService } from "../../service/MatchService";

import { IPerson } from "../../interfaces/IPerson";
import { IMatchRequest } from "../../interfaces/IMatch";
import { MatchStatus } from "../../enums/MatchStatus";
import { GradientBackground } from "components/GradientBackground";
import { LinearGradient } from "expo-linear-gradient";
import { UserSearch } from "lucide-react-native";
import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export function MatchScreen() {
  const { authState } = useAuth();
  const { getPersonsToMatch } = PersonService();
  const { saveMatch } = MatchService();
  const [personId, setPersonId] = useState<number | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const flatListRef:any = useRef(null);

  useEffect(() => {
    loadIdPerson()
    getProfiles()
  }, [])

  async function loadIdPerson() {
    const personId = authState?.user?.personId;
    setPersonId(personId);
  }

  const getProfiles = async () => { 
    setLoading(true);
    
    try {
      const data:IPerson[] = await getPersonsToMatch();
      setProfiles(data)
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDislike = async () => {
    await createMatch(MatchStatus.DISLIKE)
  };

  const handleLike = async () => {
    await createMatch(MatchStatus.LIKE)
  };

  const handleSuperlike = async () => {
    await createMatch(MatchStatus.SUPERLIKE)
  };

  async function createMatch(status:MatchStatus) {
    const match:IMatchRequest = {
      personId: personId,
      matchedId: profiles[currentIndex].id,
      status,
    }
    await saveMatch(match)

    romoveItemOfList()

    if (profiles && profiles.length > 0) {
      if (currentIndex > profiles.length -1) {
        moveToNextItem();
      } else {
        getProfiles()
      }
    } else {
      getProfiles()
    }
  }

  function romoveItemOfList() {
    if (currentIndex > -1 && currentIndex < profiles.length) {
      profiles.splice(currentIndex, 1);
    }
  }

  const moveToNextItem = () => {
    if (currentIndex < profiles.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const moveToPrevItem = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  const handleScrollEnd = async (event:any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    
    setCurrentIndex(index);

    if (currentIndex == profiles.length - 1) {
      setProfiles([])
      await getProfiles()
      setCurrentIndex(0);
    }
  };

  const renderMatchCard = ({ item }) => (
    <MatchCard
      person={item}
      pointerEvents={'none'}
      onLike={handleLike}
      onDislike={handleDislike}
      onSuperLike={handleSuperlike}
    />
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
        <UserSearch size={40} color="#FFFFFF" />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Nenhum match ainda</Text>
      <Text style={styles.emptyText}>
        Continue deslizando para encontrar seu parceiro de jogo perfeito!
      </Text>
    </View>
  );

  return(
    <SafeAreaView style={styles.container}>
      <GradientBackground withoutPadding={true}>
        <FlatList
          ref={flatListRef}
          data={profiles}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          ListFooterComponent={renderLoading}
          renderItem={renderMatchCard}
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
  cardContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    position: `absolute`,
    justifyContent: `center`,
    bottom: 170,
    marginStart: `50%`,
    marginEnd: `50%`,
  },
  dislikeButton: {
    justifyContent: `center`,
    alignItems: `center`,
    width: 80,
    height: 80,
    backgroundColor: THEME.colors.background,
    borderRadius: 80,
    margin: 10,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  likeButton: {
    justifyContent: `center`,
    alignItems: `center`,
    width: 80,
    height: 80,
    backgroundColor: THEME.colors.background,
    borderRadius: 80,
    margin: 10,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  emptyState: {
    width: width,
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
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