import { Box, Button, FormControl, Text, View } from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { THEME } from "../../styles/Theme";
import { MyInput } from "../../components/MyInput";
import { MyButton } from "../../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import backgroundLogin from './../../../assets/images/backgroud_4.jpg';
import { RegisterUser } from "../../interface/register.interface";
import { AuthService } from "../../service/AuthService";

export function SignupScreen() {
  const navigation:any = useNavigation();
  const { signup } = AuthService();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function goToLoginScreen():void {
    navigation.navigate('LoginScreen');
  }

  async function doSignup() {
    const registerUser: RegisterUser = {
      name, login, password
    }
    await signup(registerUser)
    goToLoginScreen()
  }

  return(
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={backgroundLogin}>
        <FormControl>
          <MyInput
            label={'Nome'}
            value={name}
            onChangeText={setName}
          />

          <MyInput
            type={'email-address'}
            label={'E-mail'}
            value={login}
            onChangeText={setLogin}
          />

          <MyInput
            label={'Senha'}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <MyButton
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