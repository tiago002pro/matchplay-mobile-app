import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "styles/Theme";
import ChatRoutes from "routes/chat.routes";
import { Button, View } from "react-native";
import { ProfileScreen } from "@screens/tab/ProfileScreen";
import { GamesScreen } from "@screens/tab/GamesScreen";
import { MatchScreen } from "@screens/tab/MatchScreen";
import { useEffect } from "react";
import { TabIcon } from "components/TabIcon";
import { MessageService } from "service/MessageService";
import { useAuth } from "contexts/AuthContext";
import { useUnreadMessages } from "contexts/UnreadMessagesContext";

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
          <TabIcon unreadCount={unreadCount} focused={focused} color={color} size={size} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Button
                onPress={() => {}}
                title="Chat"
                color={THEME.colors.font}
              />
              <Button
                onPress={() =>{}}
                title="Match"
                color={THEME.colors.font}
              />
            </View>
          ),
        }}
      />
    </Navigator>
  );
}