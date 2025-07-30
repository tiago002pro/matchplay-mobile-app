import { IGame } from "interfaces/IGames";
import { EditGameModal } from "modals/EditGameModal";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { platformIcons } from "shared/platformIcons";
import { THEME } from "styles/Theme";

type ProfileGamesProps = {
  games:IGame[];
  editGameModalVisible:any;
  setEditGameModalVisible:any;
}

export function ProfileGames({ games, editGameModalVisible, setEditGameModalVisible }: ProfileGamesProps) {
  const [game, setGame] = useState<IGame>(null);

  function openMpdal(game) {
    setGame(game)
    setEditGameModalVisible(true)
  }

  return (
    <View style={styles.container}>
      {
        games.map((game, index) => (
          <Pressable key={index} style={styles.game} onPress={() => openMpdal(game)}>
            <Text style={styles.gameName}>{game.name}</Text>
            {game.platforms.map((platform, index) => {
              const IconComponent = platformIcons[platform.name];
              return IconComponent ? (
                <View key={index} style={styles.platforms}>
                  <IconComponent style={styles.iconComponent} />
                </View>
              ) : null;
            })}
          </Pressable>
        ))
      }

      {
        editGameModalVisible && <EditGameModal
          modalVisible={editGameModalVisible}
          setModalVisible={setEditGameModalVisible}
          idRawgGame={game.id}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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