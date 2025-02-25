import { IPerson } from "interfaces/IPerson";
import { Box, Image, ScrollView, Text, View } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "styles/Theme";
import { GamerPeriod } from "./GamerPeriod";
import { Ionicons } from "@expo/vector-icons";
import { ProfileGames } from "./ProfileGames";

const widthScreen = Dimensions.get('screen').width;
const width = widthScreen * .7;

type MatchCardProps = {
  person:IPerson;
  pointerEvents:any
}

export function MatchCard( {person, pointerEvents}:MatchCardProps ) {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container} pointerEvents={pointerEvents}>
        <Box style={styles.imageContainer}>
          <Box style={styles.circle}></Box>
          <Ionicons
            name="person-circle-outline"
            size={width}
            color={THEME.colors.primary}
          />
          {
            person?.profileImage && <Image source={{ uri: person?.profileImage }} alt={'profileImage'} style={styles.userImage} />
          }
        </Box>

        <Box style={styles.section}>
          <Text style={styles.text}>Nome de usuário:</Text>
          <Text style={styles.name}>{person?.name}</Text>
        </Box>

        <Box style={styles.section}>
          <Text style={styles.text}>Geralmente eu jogo:</Text>
          <GamerPeriod
            gamerPeriod={person.gamerProfile.gamerPeriod}
            setGamerPeriod={null}
            pointerEvents={pointerEvents}
          />
        </Box>

        {
          person.gamerProfile.games && person.gamerProfile.games.length ? (<Box style={styles.section}>
            <Text style={styles.text}>Jogos:</Text>
            <ProfileGames games={person.gamerProfile.games}/>
          </Box>) : null
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: THEME.sizes.paddingPage * 2,
    paddingBottom: 300,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: width - width * .32,
    height: width - width * .32,
    borderRadius: width - width * .32,
    position: 'absolute',
  },
  section: {
    display: `flex`,
    gap: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: THEME.fontSizes.lg * 2,
    lineHeight: THEME.fontSizes.lg * 2,
    fontWeight: 'bold',
    color: THEME.colors.white,
  },
  text: {
    textAlign: 'center',
    color: THEME.colors.white,
  },
});
