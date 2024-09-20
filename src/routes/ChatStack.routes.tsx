import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen } from "../screens/Chat/ChatScreen";
import { MessagesScreen } from "../screens/Chat/MessagesScreen";

const { Navigator, Screen } = createStackNavigator();

export default function ChatStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="ChatScreen"
        component={ChatScreen}
      />

      <Screen
        name="MessagesScreen"
        component={MessagesScreen}
      />
    </Navigator>
  )
}