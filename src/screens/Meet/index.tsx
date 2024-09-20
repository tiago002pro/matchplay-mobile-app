import { useEffect, useState } from "react";
import { Animated, Dimensions, Image, PanResponder, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { THEME } from "../../styles/Theme";
import { MeetService } from "../../service/MeetService";

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

export default function MatchingScreen () {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();
  const [profiles, setProfiles] = useState<any[]>([]);
  const { searchAllPeopleToMeet } = MeetService();

  useEffect(() => {
    getProfiles()
  }, [])

  async function getProfiles() {
    const data = await searchAllPeopleToMeet();
    setProfiles(data)
  }

  const rotate = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const swipeThreshold = 120;

  const handleSwipe = (direction: number) => {
    Animated.timing(position, {
      toValue: { x: direction * 500, y: 0},
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(prevIndex => prevIndex +1);
      position.setValue({ x: 0, y: 0 })
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (e, { dx }) => {
      if (dx > swipeThreshold) {
        handleSwipe(1); //Right swipe
      } else if (dx < - swipeThreshold) {
        handleSwipe(-1); //Left swipe
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return(
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {
          profiles.map((profile, index) => {
            if (index < currentIndex) return null;

            const isCurrent = index === currentIndex;

            return (
              <Animated.View
                key={profile.id}
                {...(isCurrent ? panResponder.panHandlers: {})}
                style={[
                  styles.card,
                  {
                    transform: [
                      ...position.getTranslateTransform(),
                      { rotate: isCurrent ? rotate : '0deg' },
                    ]
                  }
                ]}
              >
                <Image source={{ uri: profile.profileImage }} style={styles.image} />
                <Text style={styles.name}>{profile.name}</Text>
              </Animated.View>
            );
          })
          .reverse()
        }
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
  },
  card: {
    flex: 1,
    width: widthScreen,
    height: heightScreen - 130,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    backgroundColor: THEME.colors.background,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  image: {
    width: widthScreen * .8,
    height: widthScreen * .8,
    borderRadius: widthScreen * .8,
  },
  name: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF'
  },
});