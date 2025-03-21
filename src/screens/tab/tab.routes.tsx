import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "styles/Theme";
import { ProfileScreen } from "./ProfileScreen";
import { GamesScreen } from "./GamesScreen";
import { MatchScreen } from "./MatchScreen";
import ChatRoutes from "routes/chat.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitle: '',
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: THEME.colors.background,
        },
        tabBarStyle: {
          backgroundColor: THEME.colors.background,
          borderTopWidth: 0,
          height: THEME.sizes.heightTabBar,
        },
        tabBarInactiveTintColor: THEME.colors.font,
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 5,
        },
        headerTitleStyle: {
          color: THEME.colors.font,
          fontWeight: '700',
          textTransform: 'capitalize',
        },
      }}
    >

      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'game-controller' : 'game-controller-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Match"
        component={MatchScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
          <Ionicons name={focused ? 'people-sharp' : 'people-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Chat"
        component={ChatRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
          <Ionicons name={focused ? 'chatbubble-ellipses-sharp' : 'chatbubble-ellipses-outline'} color={color} size={size}/>
        }}
      />
    </Navigator>
  );
}