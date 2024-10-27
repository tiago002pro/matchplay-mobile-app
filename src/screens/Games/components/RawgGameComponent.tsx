import { Box, Image, Text, View } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../../styles/Theme";

const { width } = Dimensions.get('screen');
const imageW = width * 0.30;
const imageH = imageW * .65;

export function RawgGameComponent({ game }:any) {
  return (
    <View style={gameStyles.container}>
      <Box style={gameStyles.imageArea}>
        <Image
          style={gameStyles.image}
          source={{uri: game.backgroundImage}}
          alt={game.name}
        />
      </Box>
      <Box style={gameStyles.nameArea}>
        <Text style={gameStyles.name} numberOfLines={3}>{game.name}</Text>
      </Box>
    </View>
  );
}

const gameStyles = StyleSheet.create({
  container: {
    width,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
  imageArea: {
    width: imageW + 20,
  },
  image: {
    width: imageW,
    height: imageH,
    borderRadius: 10
  },
  nameArea: {
    justifyContent: 'center',
    width: width - imageW - 40,
  },
  name: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg + 5,
  }
});
