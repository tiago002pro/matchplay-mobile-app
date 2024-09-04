import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./tab.routes";
import { LoginScreen } from "../screens/Login/LoginScreen";
import { SignupScreen } from "../screens/Signup/SignupScreen";

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="LoginScreen"
        component={LoginScreen}
      />

      <Screen
        name="SignupScreen"
        component={SignupScreen}
      />
      
      <Screen
        name="TabRoutes"
        component={TabRoutes}
      />
    </Navigator>
  )
}