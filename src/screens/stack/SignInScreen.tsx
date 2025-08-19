import { useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useAuth } from "../../contexts/AuthContext";
import { GradientBackground } from "components/GradientBackground";
import { Mail, Lock } from "lucide-react-native";
import { InputField } from "components/InputField";

const w = Dimensions.get('screen').width;

export function SignInScreen() {
  const navigation: any = useNavigation();
  const { doLogin } = useAuth();
  const validator = require('validator');

  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  function goToSignupScreen():void {
    navigation.navigate('SignUpScreen');
  }

  async function signIn() {
    setLoading(true);
    
    try {
      validateFormData();
      await doLogin(formData.email, formData.password)
    } catch(error) {
      setInvalidPassword(true)
      showMessage({
        message: "Credenciais Inválidas!",
        description: "Verifique seu e-mail e senha e tente novamente..",
        type: "danger",
        duration: 3000
      })
      throw new Error("Credenciais Inválidas!");
    } finally {
      setLoading(false);
    }
  }

  function validateFormData() {
    const emailValidated = formData.email.trim().length > 0;
    const passwordValidated = formData.password.trim().length > 0;

    setInvalidEmail(!emailValidated)
    setInvalidPassword(!passwordValidated)

    if (!emailValidated) { throw new Error("E-mail não informado!"); }
    if (!passwordValidated) { throw new Error("Senha não informada!"); }

    const emailIsValid = validator.isEmail(formData.email);
    setInvalidEmail(!emailIsValid)

    if (!emailIsValid) {
      showMessage({
        message: "E-mail inválido!",
        description: "Verifique seu e-mail e tente novamente.",
        type: "danger",
        duration: 3000
      })
      throw new Error("E-mail inválido!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={require('./../../../assets/images/logo.png')} alt={'Logo'} style={styles.logo} />
              </View>
              <Text style={styles.subtitle}>Bem-vindo de volta, Gamer!</Text>
            </View>

            <View style={styles.form}>
              <InputField
                icon={Mail}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                error={invalidEmail}
              />
              
              <InputField
                icon={Lock}
                placeholder="Senha"
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                isPassword={true}
                error={invalidPassword}
              />

              <PrimaryButton
                label={'Entrar'}
                action={signIn}
                loading={loading}
              />

              <TouchableOpacity
                onPress={goToSignupScreen}
                style={styles.toggleButton}
                disabled={loading}
              >
                <Text style={styles.toggleText}>
                  Não tem uma conta? <Text style={styles.toggleLink}>Criar Conta</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  logo: {
    width: w - 100,
    height: 200,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    gap: 20,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  toggleText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  toggleLink: {
    color: '#8B5CF6',
    fontFamily: 'Inter-SemiBold',
  },
})