import { createStackNavigator } from "@react-navigation/stack";
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
    </Navigator>
  )
}