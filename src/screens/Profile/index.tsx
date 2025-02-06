import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Box, ScrollView } from "native-base";
import { THEME } from "../../styles/theme";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import ProfileImagePicker from "./components/profile-image-picker/ProfileImagePicker";
import { PersonService } from "../../service/PersonService";
import { IGamerPeriod, IGamerProfile, IPerson } from "../../interfaces/IPerson";
import { GamerPeriod } from "./components/gamer-period/GamerPeriod";
import { GamerPeriodModal } from "./modals/gamer-period/GamerPeriodModal";

export default function ProfileScreen() {
  const { authState, doLogout } = useAuth();
  const { getByUserId } = PersonService();
  const [person, setPerson] = useState<IPerson | undefined>(undefined);
  const [gamerProfile, setGamerProfile] = useState<IGamerProfile | undefined>(undefined);
  const [gamerPeriod, setGamerPeriod] = useState<IGamerPeriod | undefined>(undefined);
  const [gamerPeriodModalVisible, setGamerPeriodModalVisible] = useState(false);

  useEffect(() => {
    getPersonByUser()
  }, [])

  async function getPersonByUser() {
    const userId = authState?.user?.id;
    const response:IPerson = await getByUserId(userId)
    setPerson(response);
    setGamerProfile(response.gamerProfile);
    setGamerPeriod(response.gamerProfile.gamerPeriod);
  }

  if (!person || !gamerProfile || !gamerPeriod) {
    console.log(`Loading`);
  }

  return(
    <ScrollView flex={1}>
      <View style={styles.container}>
        {person && <ProfileImagePicker person={person} setPerson={setPerson} />}

        <Box style={styles.userName}>
          <Text style={styles.text}>Nome de usuário:</Text>
          <Text style={styles.name}>{person?.name}</Text>
        </Box>

        <PrimaryButton
          label="Sair"
          action={doLogout}
        />

        {
          gamerPeriod &&
          <TouchableOpacity onPress={() => setGamerPeriodModalVisible(true)}>
            <Text style={styles.text}>Selecione dias de jogo</Text>
            <GamerPeriod
              gamerPeriod={gamerPeriod}
              setGamerPeriod={setGamerPeriod}
              pointerEvents={`none`}
            />
            {
              gamerPeriodModalVisible &&
              <GamerPeriodModal
                modalVisible={gamerPeriodModalVisible}
                setModalVisible={setGamerPeriodModalVisible}
                gamerPeriod={gamerPeriod}
                setGamerPeriod={setGamerPeriod}
              />
            }
          </TouchableOpacity>
        }

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
    display: `flex`,
    gap: 30,
  },
  userName: {
    alignItems: 'center',
    display: `flex`,
    gap: 5,
  },
  name: {
    fontSize: THEME.fontSizes.lg * 2,
    fontWeight: 'bold',
    color: '#FFF',
  },
  text: {
    textAlign: 'center',
    color: '#FFF',
  },
});