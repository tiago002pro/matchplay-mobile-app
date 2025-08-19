import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ChatRoutes from "routes/chat.routes";
import { ProfileScreen } from "@screens/tab/ProfileScreen";
import { GamesScreen } from "@screens/tab/GamesScreen";
import { MatchScreen } from "@screens/tab/MatchScreen";
import { useEffect } from "react";
import { MessageService } from "service/MessageService";
import { useAuth } from "contexts/AuthContext";
import { useUnreadMessages } from "contexts/UnreadMessagesContext";
import { MatchersScreen } from "@screens/tab/MatchersScreen";

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  const { authState } = useAuth();
  const { getUnreadCount } = MessageService();
  const { unreadCount, setUnreadCount } = useUnreadMessages();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await getUnreadCount(authState?.user?.personId);
        setUnreadCount(response.result);
      } catch (error) {
        console.error("Erro ao buscar mensagens não lidas:", error);
      }
    };

    fetchUnreadCount();
  }, []);

  return(
    <Navigator
      id={undefined}
      initialRouteName="Match"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-SemiBold',
          marginTop: -5,
          marginBottom: 5,
        },
        headerShadowVisible: false,
        tabBarShowLabel: false,
      }}
    >

      <Screen
        name="Match"
        component={MatchScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
          <Ionicons name={focused ? 'flash-sharp' : 'flash-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Matchers"
        component={MatchersScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
          <Ionicons name={focused ? 'heart-sharp' : 'heart-outline'} color={color} size={size}/>
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
        name="Chat"
        component={ChatRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} size={size}/>
        }}
      />

      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size}/>
        }}
      />
    </Navigator>
  );
}