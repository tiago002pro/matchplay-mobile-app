import { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Box, Button, FormControl, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../styles/theme";
import { PrimaryInput } from "../../components/PrimaryInput";
import { PrimaryButton } from "../../components/PrimaryButton";

import { AuthenticationService } from "../../service/AuthenticationService";

import { IRegister } from "../../interfaces/IUser";

import backgroundLogin from './../../../assets/images/backgroud_4.jpg';

export function SignUpScreen() {
  const navigation:any = useNavigation();
  const { signup } = AuthenticationService();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function doSignup() {
    const registerUser: IRegister = { name, email, password }
    await signup(registerUser)
    goToLoginScreen()
  }

  function goToLoginScreen():void {
    navigation.navigate('SignInScreen');
  }

  return(
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={backgroundLogin}>
        <FormControl>
          <PrimaryInput
            label={'Nome'}
            value={name}
            onChangeText={setName}
          />

          <PrimaryInput
            type={'email-address'}
            label={'E-mail'}
            value={email}
            onChangeText={setEmail}
          />

          <PrimaryInput
            label={'Senha'}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
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
  loginBtnArea: {
    marginTop: 30,
    alignItems: 'center'
  },
  text: {
    color:  THEME.colors.white,
  },
})