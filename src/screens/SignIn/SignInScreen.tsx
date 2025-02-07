import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { THEME } from "../../styles/theme";
import { Box, Button, FormControl, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { PrimaryInput } from "../../components/PrimaryInput";
import { PrimaryButton } from "../../components/PrimaryButton";
import backgroundLogin from './../../../assets/images/backgroud_4.jpg';
import { useAuth } from "../../contexts/AuthContext";

export function SignInScreen() {
  const navigation:any = useNavigation();
  const { doLogin } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function goToSignupScreen():void {
    navigation.navigate('SignUpScreen');
  }

  async function signIn() {
    await doLogin(email, password)
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={backgroundLogin}>
        <FormControl>
          <PrimaryInput
            type={'email-address'}
            label={'E-mail'}
            value={email}
            onChangeText={setEmail}
          />

          <PrimaryInput
            key={'Senha'}
            label={'Senha'}
            value={password}
            onChangeText={setPassword}
            isPassword={true}
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