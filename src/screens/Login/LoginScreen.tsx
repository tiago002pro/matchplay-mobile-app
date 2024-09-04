import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { THEME } from "../../styles/Theme";
import { Box, Button, FormControl, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MyInput } from "../../components/MyInput";
import { MyButton } from "../../components/MyButton";
import backgroundLogin from './../../../assets/images/backgroud_4.jpg';
import AuthService from "../../service/AuthService";

export function LoginScreen() {
  const navigation:any = useNavigation();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function goToSignupScreen():void {
    navigation.navigate('SignupScreen');
  }

  function goToTabRoutes():void {
    navigation.navigate('TabRoutes');
  }

  async function doLogin() {
    const token = await AuthService.login(login, password)
    console.log("token", token);
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={backgroundLogin}>
        <FormControl>
          <MyInput
            type={'email-address'}
            label={'E-mail'}
            value={login}
            onChangeText={setLogin}
          />

          <MyInput
            key={'Senha'}
            label={'Senha'}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <MyButton
            label={'Entrar'}
            action={doLogin}
          />

          <Box style={styles.signupBtnArea}>
            <Text style={styles.text}>Não tem conta?</Text>
            <Button
              onPress={goToSignupScreen}
              bg={THEME.colors.primary}
            >
              Cadastre-se
            </Button>
          </Box>
        </FormControl>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
    padding: 20,
  },
  signupBtnArea: {
    marginTop: 30,
    alignItems: 'center'
  },
  text: {
    color:  THEME.colors.white,
  },
})