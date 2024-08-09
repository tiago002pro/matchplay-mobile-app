import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./tab.routes";

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
  <Navigator>
    <Screen
      options={{ headerShown: true }}
      name="TabRoutes"
      component={TabRoutes}
    />
  </Navigator>
}