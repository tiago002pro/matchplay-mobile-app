import { Text } from "native-base";
import { Image, StyleSheet, View } from "react-native";
import { THEME } from "styles/Theme";

const images = {
  notFound: require('./../../assets/images/dont-know.png'),
}

type EmptyDataProps = {
  dataList: any[],
  image?: string,
  title: string,
  text: string,
}

export function EmptyData({ dataList, image, title, text }:EmptyDataProps) {
  return (
    <View>
      {
        !dataList || !dataList.length &&
        <View style={styles.container}>
          <Image source={image ? images[image] : images['notFound']} alt={'icon'} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>

        </View>
      }
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    height: `100%`,
    alignItems: `center`,
    gap: 20,
    paddingTop: `50%`,
  },
  image: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: `center`,
    width: '70%',
  },
  title: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.xl + 5,
    lineHeight: THEME.fontSizes.xl + 5,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.xl,
    textAlign: 'center',
  },
});
