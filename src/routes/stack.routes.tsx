import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "../screens/SignIn/SignInScreen";
import { SignUpScreen } from "../screens/SignUp/SignUpScreen";

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