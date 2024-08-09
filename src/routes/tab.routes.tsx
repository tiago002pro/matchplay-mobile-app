import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import Games from "../screens/Games";
import Meet from "../screens/Meet";
import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#030303',
        },
        tabBarStyle: {
          backgroundColor: '#030303',
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: '#fff', 
        tabBarActiveTintColor: '#8A2BE2',
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 5,
        },
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'InterTight_700Bold',
          fontWeight: '700',
          textTransform: 'capitalize',
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size}/>
        }}
      />

      <Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Meet"
        component={Meet}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'people-sharp' : 'people-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Games"
        component={Games}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'game-controller' : 'game-controller-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={size}/>
        }}
      />
    </Navigator>
  );
}