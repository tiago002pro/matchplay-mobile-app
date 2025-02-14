import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { Box, Button, FormControl, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import { THEME } from "styles/Theme";
import { PrimaryInput } from "../../components/PrimaryInput";
import { PrimaryButton } from "../../components/PrimaryButton";

import { AuthenticationService } from "../../service/AuthenticationService";

import { IRegister } from "../../interfaces/IUser";

import backgroundLogin from './../../../assets/images/backgroud_4.jpg';

export function SignUpScreen() {
  const navigation:any = useNavigation();
  const { signup } = AuthenticationService();
  const validator = require('validator');

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [validName, setValidName] = useState<boolean>(true);
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);

  async function doSignup() {
    const nameValidated = name.trim().length > 0;
    const emailValidated = validator.isEmail(email);
    const passwordValidated = password.trim().length > 0;

    setValidName(nameValidated)
    setValidEmail(emailValidated)
    setValidPassword(passwordValidated)

    if (!nameValidated || !emailValidated || !passwordValidated) return

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
    
    const registerUser: IRegister = { name, email, password }
    try {
      await signup(registerUser)
      goToLoginScreen()
    } catch(error) {
      return
    }
  }

  function goToLoginScreen():void {
    navigation.navigate('SignInScreen');
  }

  return(
    <ImageBackground style={styles.background} source={backgroundLogin}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <FormControl>
            <PrimaryInput
              label={'Nome'}
              value={name}
              onChangeText={setName}
              autoCapitalize={true}
              error={!validName}
            />

            <PrimaryInput
              type={'email-address'}
              label={'E-mail'}
              value={email}
              onChangeText={setEmail}
              autoCapitalize={false}
              error={!validEmail}
            />

            <PrimaryInput
              label={'Senha'}
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              autoCapitalize={false}
              error={!validPassword}
            />

            <PrimaryButton
              label={'Cadastrar'}
              action={doSignup}
            />

              <Box style={styles.loginBtnArea}>
                <Text style={styles.text}>Possuí tem conta?</Text>
                <Button
                  onPress={goToLoginScreen}
                  bg={THEME.colors.primary}
                >
                  Faça o login
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
  loginBtnArea: {
    marginTop: 30,
    alignItems: 'center'
  },
  text: {
    color:  THEME.colors.white,
  },
})