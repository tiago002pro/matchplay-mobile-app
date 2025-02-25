import { IGame } from "interfaces/IGames";
import { StyleSheet, Text, View } from "react-native";
import { platformIcons } from "shared/platformIcons";
import { THEME } from "styles/Theme";

type ProfileGamesProps = {
  games:IGame[];
}

export function ProfileGames({ games }: ProfileGamesProps) {
  return (
    <View style={styles.container}>
      {
        games.map((game, index) => (
          <View key={index} style={styles.game}>
            <Text style={styles.gameName}>{game.name}</Text>
            {game.platforms.map((platform, index) => {
              const IconComponent = platformIcons[platform.name];
              return IconComponent ? (
                <View key={index} style={styles.platforms}>
                  <IconComponent style={styles.iconComponent} />
                </View>
              ) : null;
            })}
          </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    flexWrap: `wrap`,
    flexDirection: "row",
    justifyContent: `center`,
    gap: 5,
  },
  game: {
    flexDirection: "row",
    alignItems: `center`,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    padding: 5,
    borderRadius: 30
  },
  gameName: {
    color: THEME.colors.font,
    marginRight: 7,
  },
  platforms: {
    flexDirection: "row",
  },
  iconComponent: {
    width: 12,
    height: 12,
    marginLeft: 3,
  },
});