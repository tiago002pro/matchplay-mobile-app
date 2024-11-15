import { StyleSheet, Text, View } from "react-native";
import { Box } from "native-base";
import { THEME } from "../../styles/Theme";
import { MyButton } from "../../components/MyButton";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import ProfileImagePicker from "../../components/ProfileImagePicker";
import { PersonService } from "../../service/PersonService";
import { Person } from "../../interfaces/IPerson";

export default function ProfileScreen() {
  const { authState, doLogout } = useAuth();
  const { getByUserId } = PersonService();
  const [person, setPerson] = useState<Person>({});

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const userId = authState?.user?.id;
    const data:Person = await getByUserId(userId)
    setPerson(data);
  }

  return(
    <View style={styles.container}>
      <ProfileImagePicker person={person} setPerson={setPerson} />

      <Box style={styles.userName}>
        <Text style={styles.text}>Nome de usuário:</Text>
        <Text style={styles.name}>{person?.name}</Text>
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