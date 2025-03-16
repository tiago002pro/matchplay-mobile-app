import { createStackNavigator } from "@react-navigation/stack";
import ChatApp from "@screens/tab/MessageScreen";
import { ChatScreen } from "@screens/tab/ChatScreen";
import { returnBtn } from "components/ReturnBtn";
import { THEME } from "styles/Theme";
import MessageScreen from "@screens/tab/MessageScreen";

const { Navigator, Screen } = createStackNavigator();

export default function ChatRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: THEME.colors.background,
        },
        headerTitleAlign: 'center',
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
        options={({ }:any) => ({ title: "" })}
      />

      <Screen
        name="MessageScreen"
        component={MessageScreen}
        options={({ route }:any) => ({ title: route.params.chat.name, chat: route.params.chat, headerLeft: returnBtn })}
      />
    </Navigator>
  )
}