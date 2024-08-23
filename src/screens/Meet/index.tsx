import { useState } from "react";
import { Animated, Dimensions, Image, PanResponder, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { THEME } from "../../styles/Theme";
import { VStack } from "native-base";

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

const profiles = [
  { id: 1, name: 'Naruto Uzumaki', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfmj6b3-e25a64e8-bb64-4bb6-a2b5-f33b2284ff60.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE4YWNkMzY5LWVhNDQtNDcxYi1hZWViLTllNmU4ZTNlZDlkNVwvZGZtajZiMy1lMjVhNjRlOC1iYjY0LTRiYjYtYTJiNS1mMzNiMjI4NGZmNjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2iUKFMUZS0K0CEEST2fLJFjsMHxE4dxImjGWLn9xSUA' },
  { id: 2, name: 'Monkey D. Luffy', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfmj5ob-f93ac886-db5c-4168-bdf7-55c94736a4c2.png/v1/fit/w_595,h_595,q_70,strp/anime___digital_art_by_themingarts_dfmj5ob-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTk1IiwicGF0aCI6IlwvZlwvMThhY2QzNjktZWE0NC00NzFiLWFlZWItOWU2ZThlM2VkOWQ1XC9kZm1qNW9iLWY5M2FjODg2LWRiNWMtNDE2OC1iZGY3LTU1Yzk0NzM2YTRjMi5wbmciLCJ3aWR0aCI6Ijw9NTk1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.LVeZXO-oeXnXt7GWFqEHX8gjlzv6EP3M3Qe-vQs_tOk' },
  { id: 3, name: 'Alice', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfm8wdf-a2241896-88ee-4e67-aac4-7c0576522008.png/v1/fit/w_595,h_595,q_70,strp/anime___digital_art_by_themingarts_dfm8wdf-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTk1IiwicGF0aCI6IlwvZlwvMThhY2QzNjktZWE0NC00NzFiLWFlZWItOWU2ZThlM2VkOWQ1XC9kZm04d2RmLWEyMjQxODk2LTg4ZWUtNGU2Ny1hYWM0LTdjMDU3NjUyMjAwOC5wbmciLCJ3aWR0aCI6Ijw9NTk1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.S0mJ4C4MHrmLFn_zm5IglpTqCIpL-vzy5-jKDcIeVw8' },
  { id: 4, name: 'John', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfm8wgf-b00faacd-ba15-4969-8c33-651f6556d126.png/v1/fit/w_595,h_595,q_70,strp/anime___digital_art_by_themingarts_dfm8wgf-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTk1IiwicGF0aCI6IlwvZlwvMThhY2QzNjktZWE0NC00NzFiLWFlZWItOWU2ZThlM2VkOWQ1XC9kZm04d2dmLWIwMGZhYWNkLWJhMTUtNDk2OS04YzMzLTY1MWY2NTU2ZDEyNi5wbmciLCJ3aWR0aCI6Ijw9NTk1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.9OYvOgnzmhX5o7ipLpoPtYOPWcEL1829nyyB5QwtyAA' },
  { id: 5, name: 'Mark', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfnadc6-0722c315-6284-44e8-9b26-9cd94139af64.png/v1/fit/w_585,h_585,q_70,strp/anime___digital_art_by_themingarts_dfnadc6-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTg1IiwicGF0aCI6IlwvZlwvMThhY2QzNjktZWE0NC00NzFiLWFlZWItOWU2ZThlM2VkOWQ1XC9kZm5hZGM2LTA3MjJjMzE1LTYyODQtNDRlOC05YjI2LTljZDk0MTM5YWY2NC5wbmciLCJ3aWR0aCI6Ijw9NTg1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.LflYnhqC__LWeDZCiTeEUjjdEmMnaOWVJqctRan4GXA' },
  { id: 6, name: 'Ane', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfm8qon-f64d3423-ee2e-41cc-9767-ae6df73da84c.png/v1/fit/w_595,h_595,q_70,strp/anime_art_by_themingarts_dfm8qon-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTk1IiwicGF0aCI6IlwvZlwvMThhY2QzNjktZWE0NC00NzFiLWFlZWItOWU2ZThlM2VkOWQ1XC9kZm04cW9uLWY2NGQzNDIzLWVlMmUtNDFjYy05NzY3LWFlNmRmNzNkYTg0Yy5wbmciLCJ3aWR0aCI6Ijw9NTk1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.091g7GbeznNEP4fvC7JsiRZzCa6mjIRhIv6LSgYLWnA' },
];

export default function MatchingScreen () {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();

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
                <Image source={{ uri: profile.image }} style={styles.image} />
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