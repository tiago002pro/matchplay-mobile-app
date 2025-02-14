import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Box, Button, FormControl, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import { THEME } from "styles/Theme";
import { PrimaryInput } from "../../components/PrimaryInput";
import { PrimaryButton } from "../../components/PrimaryButton";

import { useAuth } from "../../contexts/AuthContext";

import backgroundLogin from './../../../assets/images/backgroud_4.jpg';

export function SignInScreen() {
  const navigation:any = useNavigation();
  const { doLogin } = useAuth();
  const validator = require('validator');

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);

  function goToSignupScreen():void {
    navigation.navigate('SignUpScreen');
  }

  async function signIn() {
    const emailValidated = email.trim().length > 0;
    const passwordValidated = password.trim().length > 0;

    setValidEmail(emailValidated)
    setValidPassword(passwordValidated)

    if (!emailValidated || !passwordValidated) return

    const emailIsValid = validator.isEmail(email);
    setValidEmail(emailIsValid)

    if (!emailIsValid) {
      showMessage({
        message: "E-mail inválido!",
        description: "Verifique seu e-mail e tente novamente.",
        type: "danger",
        duration: 3000
      })
      throw new Error("E-mail inválido!");
    }

    try {
      await doLogin(email, password)
    } catch(error) {
      setValidPassword(false)
      showMessage({
        message: "Credenciais Inválidas!",
        description: "Verifique seu e-mail e senha e tente novamente..",
        type: "danger",
        duration: 3000
      })
      throw new Error("Credenciais Inválidas!");
    }
  }

  return (
    <ImageBackground style={styles.background} source={backgroundLogin}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <FormControl>
            <PrimaryInput
              type={'email-address'}
              label={'E-mail'}
              value={email}
              onChangeText={setEmail}
              autoCapitalize={false}
              error={!validEmail}
            />

            <PrimaryInput
              key={'Senha'}
              label={'Senha'}
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              autoCapitalize={false}
              error={!validPassword}
            />

            <PrimaryButton
              label={'Entrar'}
              action={signIn}
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
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.sizes.paddingPage,
  },
  signupBtnArea: {
    marginTop: 30,
    alignItems: 'center'
  },
  text: {
    color:  THEME.colors.white,
  },
})