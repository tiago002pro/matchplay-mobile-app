import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/Profile";
import GamesScreen from "../screens/Games/GamesScreen";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../styles/theme";
import { MatchScreen } from "../screens/Match/MatchScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: THEME.colors.header,
        },
        tabBarStyle: {
          backgroundColor: THEME.colors.background,
          borderTopWidth: 0,
          height: THEME.sizes.heightTabBar,
        },
        tabBarInactiveTintColor: '#fff', 
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 5,
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: '700',
          textTransform: 'capitalize',
        },
      }}
    >
      {/* <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size}/>
        }}
      /> */}

      {/* <Screen
        name="ChatStackRoutes"
        component={ChatStackRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} size={size}/>
        }}
      /> */}

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
    </Navigator>
  );
}