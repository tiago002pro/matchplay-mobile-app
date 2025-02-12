import { FlatList, Text, View } from "native-base";
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { THEME } from "../../styles/theme";
import { PersonService } from "../../service/PersonService";
import { useEffect, useRef, useState } from "react";
import { IPerson } from "../../interfaces/IPerson";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IMatchRequest } from "../../interfaces/IMatch";
import { MatchStatus } from "../../enums/MatchStatus";
import { useAuth } from "../../contexts/AuthContext";
import { MatchService } from "../../service/MatchService";

const { width, height } = Dimensions.get("window");

export function MatchScreen() {
  const { authState } = useAuth();
  const { getPersonsToMatch } = PersonService();
  const { saveMatch } = MatchService();
  const [personId, setPersonId] = useState<number | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState<IPerson[]>([]);
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
    const data:IPerson[] = await getPersonsToMatch();
    setProfiles(data)
  }

  const handleDislike = async () => {
    await createMatch(MatchStatus.DISLIKE)
  };

  const handleLike = async () => {
    await createMatch(MatchStatus.LIKE)
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

  return(
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={profiles}
          keyExtractor={(data:any) => data.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={({item}) =>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.name}>{item.name} / {item.id}</Text>
              </View>
            </View>
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.dislikeButton} onPress={handleDislike}>
          <MaterialCommunityIcons name="google-controller-off" size={40} color={THEME.colors.red[400]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <MaterialCommunityIcons name="google-controller" size={40} color={THEME.colors.green[500]} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: `center`,
  },
  profiles: {
    display: `flex`,
    flexDirection: `row`,
  },
  cardContainer: {
    width,
    justifyContent: 'center',
    alignContent: `center`,
  },
  card: {
    margin: THEME.sizes.paddingPage,
    height: height - THEME.sizes.paddingPage - (THEME.sizes.heightTabBar + THEME.sizes.paddingPage),
    backgroundColor: THEME.colors.background,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: THEME.colors.white,
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
});