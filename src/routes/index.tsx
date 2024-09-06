import { useAuth } from "../context/AuthContext";
import StackRoutes from "./stack.routes";
import TabRoutes from "./tab.routes";

export default function Routes() {
  const { authState } = useAuth();

  return (
    authState.isAuthenticated ? <TabRoutes/> : <StackRoutes/>
  );
}