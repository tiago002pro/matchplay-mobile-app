import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "@screens/stack/SignInScreen";
import { SignUpScreen } from "@screens/stack/SignUpScreen";
import { THEME } from "styles/Theme";

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: THEME.colors.primary,
        },
        headerTitleStyle: {
          color: THEME.colors.font,
          fontWeight: '700',
          textTransform: 'capitalize',
        },
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