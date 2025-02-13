import { useAuth } from "../contexts/AuthContext";
import StackRoutes from "@screens/stack/stack.routes";
import TabRoutes from "@screens/tab/tab.routes";

export default function Routes() {
  const { authState } = useAuth();

  return (
    authState.isAuthenticated ? <TabRoutes/> : <StackRoutes/>
  );
}