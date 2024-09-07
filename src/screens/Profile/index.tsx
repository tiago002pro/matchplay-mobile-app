import { StyleSheet, Text, View } from "react-native";
import { Box } from "native-base";
import { THEME } from "../../styles/Theme";
import { MyButton } from "../../components/MyButton";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import ImagePicker from "../../components/ImagePicker";

export default function ProfileScreen() {
  const { authState, doLogout } = useAuth();
  const [user, setUser] = useState<any>(authState.user);

  return(
    <View style={styles.container}>
      <ImagePicker user={user} />

      <Box style={styles.userName}>
        <Text style={styles.text}>Nome de usuário:</Text>
        <Text style={styles.name}>{user?.name}</Text>
      </Box>

      <Box style={{marginTop: 30}}>
        <MyButton
          label="Sair"
          action={doLogout}
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
  },
  userName: {
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
  },
  name: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
});