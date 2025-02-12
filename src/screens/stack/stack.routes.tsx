import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "./SignInScreen";
import { SignUpScreen } from "./SignUpScreen";

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="SignInScreen"
        component={SignInScreen}
      />

      <Screen
        name="SignUpScreen"
        component={SignUpScreen}
      />
    </Navigator>
  )
}