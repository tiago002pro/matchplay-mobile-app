import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { THEME } from "styles/Theme";

export const TabIcon = ({ unreadCount, focused, color, size }) => (
  <View>
    <Ionicons name={focused ? 'chatbubble-ellipses-sharp' : 'chatbubble-ellipses-outline'} color={color} size={size}/>
    {unreadCount > 0 && (
      <View
        style={{
          position: "absolute",
          right: -6,
          top: -4,
          backgroundColor: THEME.colors.secondary,
          borderRadius: 10,
          width: 18,
          height: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: THEME.colors.font, fontSize: 12, fontWeight: 700 }}>
          {unreadCount}
        </Text>
      </View>
    )}
  </View>
);
