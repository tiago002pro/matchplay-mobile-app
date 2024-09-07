import { Ionicons } from "@expo/vector-icons";
import { Box, Image } from "native-base";
import { useState } from "react";
import { THEME } from "../styles/Theme";
import { Dimensions, StyleSheet } from "react-native";

const widthScreen = Dimensions.get('screen').width;

export default function ImagePicker( {user}:any ) {
  const [image, setImage] = useState(null);

  return (
    <Box style={styles.imageContainer}>
      <Box style={styles.circle}></Box>
      <Ionicons
        name="person-circle-outline"
        size={widthScreen}
        color={THEME.colors.primary}
      />
      {
        user.image && <Image source={{ uri: user.image }} alt={user.name} style={styles.userImage} />
      }
    </Box>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: widthScreen,
    height: widthScreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: widthScreen - widthScreen * .27,
    width: widthScreen - widthScreen * .27,
    height: widthScreen - widthScreen * .27,
    borderWidth: widthScreen * .03,
    borderColor: THEME.colors.background,
    zIndex: 999999,
    position: 'absolute',
  },
  userImage: {
    width: widthScreen - widthScreen * .32,
    height: widthScreen - widthScreen * .32,
    borderRadius: widthScreen - widthScreen * .32,
    position: 'absolute',
  },
});