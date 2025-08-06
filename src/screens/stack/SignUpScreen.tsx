import { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { PrimaryButton } from "../../components/PrimaryButton";
import { AuthenticationService } from "../../service/AuthenticationService";
import { IRegister } from "../../interfaces/IUser";
import { GradientBackground } from "components/GradientBackground";
import { Gamepad2, Mail, User, Lock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { InputField } from "components/InputField";
import { TouchableOpacity } from "react-native-gesture-handler";

export function SignUpScreen() {
  const navigation:any = useNavigation();
  const { signup } = AuthenticationService();
  const validator = require('validator');

  const [invalidName, setInvalidName] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  function goToLoginScreen():void {
    navigation.navigate('SignInScreen');
  }

  async function doSignup() {
    setLoading(true);
    
    try {
      validateFormData();
      const registerUser: IRegister = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      await signup(registerUser)
      goToLoginScreen()
    } catch(error) {
      showMessage({
        message: "Ops, algo deu errado!",
        description: "Tente novamente mais tarde.",
        type: "danger",
        duration: 3000
      })
      throw new Error("Credenciais Inválidas!");
    } finally {
      setLoading(false);
    }
  }

  function validateFormData() {
    const nameValidated = formData.name.trim().length > 0;
    const emailValidated = validator.isEmail(formData.email);
    const passwordValidated = formData.password.trim().length > 0;

    setInvalidName(!nameValidated)
    setInvalidEmail(!emailValidated)
    setInvalidPassword(!passwordValidated)

    if (!nameValidated) { throw new Error("Nome não informado!"); }
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

  return(
    <SafeAreaView style={styles.container}>
      <GradientBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Gamepad2 size={60} color="#8B5CF6" />
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.logoGlow}
                />
              </View>
              <Text style={styles.title}>MatchPlay</Text>
              <Text style={styles.subtitle}>Bem-vindo de volta, Gamer!</Text>
            </View>

            <View style={styles.form}>
              <InputField
                icon={User}
                placeholder="Nome completo"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                keyboardType="name"
                error={invalidName}
              />

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
                label={'Criar conta'}
                action={doSignup}
                loading={loading}
              />

              <TouchableOpacity
                onPress={() => goToLoginScreen()}
                style={styles.toggleButton}
                disabled={loading}
              >
                <Text style={styles.toggleText}>
                  Já tem uma conta? <Text style={styles.toggleLink}>Entrar</Text>
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
  logoGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    opacity: 0.3,
    borderRadius: 50,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: '#8B5CF6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
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