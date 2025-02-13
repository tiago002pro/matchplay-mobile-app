import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Box, Button, FormControl, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../styles/theme";
import { PrimaryInput } from "../../components/PrimaryInput";
import { PrimaryButton } from "../../components/PrimaryButton";

import { useAuth } from "../../contexts/AuthContext";

import backgroundLogin from './../../../assets/images/backgroud_4.jpg';

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
    <SafeAreaView style={styles.safeAreaView}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.background,
  },
  signupBtnArea: {
    marginTop: 30,
    alignItems: 'center'
  },
  text: {
    color:  THEME.colors.white,
  },
})