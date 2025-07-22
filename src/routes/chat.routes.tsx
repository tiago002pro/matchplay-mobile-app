import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen } from "@screens/tab/ChatScreen";
import { returnBtn } from "components/ReturnBtn";
import { THEME } from "styles/Theme";
import MessageScreen from "@screens/stack/MessageScreen";
import { Dimensions, View } from "react-native";
import { Button } from "native-base";

const { Navigator, Screen } = createStackNavigator();
const { width } = Dimensions.get("window");
const widthHeaderBtn = (width / 2) - (THEME.sizes.paddingPage);

export default function ChatRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: THEME.colors.primary,
        },
        headerTitleStyle: {
          color: THEME.colors.font,
          fontWeight: '700',
          textTransform: 'capitalize',
        },
      }}
    >
      <Screen
        name="ChatScreen"
        component={ChatScreen}
        options={() => ({ title: null })}
      />

      <Screen
        name="MessageScreen"
        component={MessageScreen}
        options={({ route }:any) => ({ title: route.params.chat.name, chat: route.params.chat, headerLeft: returnBtn, headerRight: null })}
      />
    </Navigator>
  )
}

const HeaderButtons = ({ navigation, currentScreen }) => (
  <View style={{
    paddingStart: THEME.sizes.paddingPage,
    paddingEnd: THEME.sizes.paddingPage,
    flexDirection: 'row',
    justifyContent: 'center',
    width,
  }}>
    <Button
      onPress={() => navigation.replace('ChatScreen')}
      color={THEME.colors.font}
      w={widthHeaderBtn}
      style={{
        backgroundColor: (currentScreen == 'ChatScreen') ? THEME.colors.primary : 'transparent'
      }}
    >
      Chat
    </Button>
    <Button
      onPress={() => navigation.replace('MatchersScreen')}
      color={THEME.colors.font}
      w={widthHeaderBtn}
      style={{
        backgroundColor: (currentScreen == 'MatchersScreen') ? THEME.colors.primary : 'transparent'
      }}
    >
      Matchers
    </Button>
  </View>
);
