import { Box, Image, Text, View } from "native-base";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { THEME } from "styles/Theme";
import React from "react";
import { platformIcons } from "shared/platformIcons";
import { GamerProfileService } from "service/GamerProfileService";
import { useAuth } from "contexts/AuthContext";

const { width } = Dimensions.get('screen');
const imageW = width * 0.40;

export function RawgGame({ game }:RawgGameProps) {
  const { authState } = useAuth();
  const { addGameToProfile } = GamerProfileService();

  const saveGame = async (platform) => {
    const request = {
      id: game.id,
      name: game.name,
      backgroundImage: game.backgroundImage,
      idPlatform: platform.id,
      namePlatform: platform.name,
    }
    await addGameToProfile(authState?.user?.gamerProfileId, request);
  }

  return (
    <View style={styles.container} key={game.id}>
      <Box style={styles.imageArea}>
        <Image
          style={styles.image}
          source={{uri: game.backgroundImage}}
          alt={game.name}
        />
      </Box>

      <Box style={styles.descriptionContainer}>
        <Box style={styles.description}>
          <Text style={styles.name}>{game.name}</Text>
          <Text style={styles.text}>Adicione este jogo ao seu perfl em:</Text>

          <Box style={styles.platformsContainer}>
            {game.platforms.map((platform, index) => {
              const IconComponent = platformIcons[platform.name];
              return IconComponent ? (
                <Pressable key={index} style={styles.platforms} onPress={() => saveGame(platform)}>
                  <IconComponent style={styles.iconComponent} />
                  <Text style={styles.iconName}>{platform.name}</Text>
                </Pressable>
              ) : null;
            })}
          </Box>
        </Box>
      </Box>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: width - THEME.sizes.paddingPage * 2,
    marginBottom: THEME.sizes.paddingPage * 2,
    justifyContent: `center`,
  },
  imageArea: {
    width: imageW,
    height: imageW,
    borderRadius: imageW,
    position: `absolute`,
    zIndex: 1,
  },
  image: {
    width: imageW,
    height: imageW,
    borderRadius: imageW,
    backgroundColor: THEME.colors.primary,
  },
  descriptionContainer: {
    width: width - THEME.sizes.paddingPage * 2,
    alignItems: `flex-end`,
  },
  description: {
    width: width - (imageW * .5) - THEME.sizes.paddingPage * 2,
    minHeight: imageW,
    paddingLeft: imageW * .5,
    paddingTop: THEME.sizes.paddingPage,
    paddingBottom: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    borderRadius: 30,
    backgroundColor: THEME.colors.secondary,
  },
  name: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.md,
    textAlign: `right`,
    marginBottom: 5,
    fontWeight: `700`
  },
  text: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.sm - 2,
    marginBottom: 5,
  },
  platformsContainer: {
    flexDirection: "row",
    flexWrap: `wrap`,
    justifyContent: `flex-end`,
    marginTop: 5,
  },
  platforms: {
    flexDirection: "row",
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    paddingStart: 10,
    paddingEnd: 10,
    marginEnd: 5,
    marginBottom: 5,
    borderRadius: 30
  },
  iconComponent: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  iconName: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.sm - 2,
  },
});
