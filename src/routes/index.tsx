import { useAuth } from "../contexts/AuthContext";
import StackRoutes from "./stack.routes";
import TabRoutes from "./tab.routes";
import { View, ActivityIndicator } from "react-native";

export default function Routes() {
  const { authState, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    authState.isAuthenticated ? <TabRoutes /> : <StackRoutes />
  );
}