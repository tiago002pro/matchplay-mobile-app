import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Box, Pressable, ScrollView } from "native-base";

import { THEME } from "styles/Theme";
import { PrimaryButton } from "../../components/PrimaryButton";
import { GamerPeriod } from "../../components/GamerPeriod";
import { ProfileImagePicker } from "components/ProfileImagePicker";
import { EditGamerPeriodModal } from "modals/EditGamerPeriodModal";
import { EditUsernameModal } from "modals/EditUsernameModal";
import { ProfileGames } from "components/ProfileGames";

import { useAuth } from "../../contexts/AuthContext";
import { PersonService } from "../../service/PersonService";

import { IGamerPeriod, IGamerProfile, IPerson } from "../../interfaces/IPerson";
import { IGame } from "interfaces/IGames";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GradientBackground } from "components/GradientBackground";

export function ProfileScreen() {
  const { authState, doLogout } = useAuth();
  const { getById } = PersonService();
  const navigation:any = useNavigation();

  const [person, setPerson] = useState<IPerson | undefined>(undefined);
  const [gamerProfile, setGamerProfile] = useState<IGamerProfile | undefined>(undefined);
  const [gamerPeriod, setGamerPeriod] = useState<IGamerPeriod | undefined>(undefined);
  const [games, setGames] = useState<IGame[] | undefined>(undefined);

  const [editUsernameModalVisible, setEditUsernameModalVisible] = useState<boolean>(false);
  const [gamerPeriodModalVisible, setGamerPeriodModalVisible] = useState<boolean>(false);
  const [editGameModalVisible, setEditGameModalVisible] = useState<boolean>(false);

  // UseFocusEffect para chamar a API quando a tela de perfil estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      getPersonByUser();  // Chama a função que faz a requisição à API
    }, [editGameModalVisible])  // Array vazio garante que a requisição seja feita uma vez ao focar a tela
  );

  async function getPersonByUser() {
    const personId = authState?.user?.personId;
    const response:IPerson = await getById(personId)
    setPerson(response);
    setGamerProfile(response.gamerProfile);
    setGamerPeriod(response.gamerProfile.gamerPeriod);
    setGames(response.gamerProfile.games);
  }

  const goToGameScreen = () => {
    navigation.navigate('Games');
  }

  if (!person || !gamerProfile || !gamerPeriod) {
    // doLogout()
  }

  return(
    <GradientBackground>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            {person && <ProfileImagePicker person={person} setPerson={setPerson} />}

            {
              person &&
              <Pressable onPress={() => setEditUsernameModalVisible(true)}>
                <Box style={styles.section}>
                  <Text style={styles.text}>Nome de usuário:</Text>
                  <Text style={styles.name}>{person?.name}</Text>
                </Box>

                {
                  editUsernameModalVisible &&
                  <EditUsernameModal
                    modalVisible={editUsernameModalVisible}
                    setModalVisible={setEditUsernameModalVisible}
                    person={person}
                    setPerson={setPerson}
                  />
                }
              </Pressable>
            }

            {
              gamerPeriod &&
              <Pressable onPress={() => setGamerPeriodModalVisible(true)} style={styles.pressable}>
                <Box style={styles.gamerPeriodBtn}>
                  <Text style={styles.text}>Selecione dias de jogo</Text>
                  <GamerPeriod
                    gamerPeriod={gamerPeriod}
                    setGamerPeriod={setGamerPeriod}
                    pointerEvents={`none`}
                  />
                  {
                    gamerPeriodModalVisible &&
                    <EditGamerPeriodModal
                      modalVisible={gamerPeriodModalVisible}
                      setModalVisible={setGamerPeriodModalVisible}
                      gamerPeriod={gamerPeriod}
                      setGamerPeriod={setGamerPeriod}
                    />
                  }
                </Box>
              </Pressable>
            }

            <Box style={styles.section}>
              <Box style={[styles.section, {marginBottom: 5}]}>
                <Text style={styles.text}>Jogos:</Text>
                <Text style={styles.text}>(Toque para editar ou remover)</Text>
              </Box>

              {
                games && games.length
                  ? <ProfileGames
                    games={games}
                    editGameModalVisible={editGameModalVisible}
                    setEditGameModalVisible={setEditGameModalVisible}
                  />
                  : <Text style={styles.text}>Nenhum jogo foi adicionado.</Text>
              }
            </Box>

            <Box style={styles.section}>
              <Pressable style={styles.btnNewGame} onPress={goToGameScreen}>
                <Text style={styles.text}>Adicione mais jogos na aba de jogos!</Text>
              </Pressable>
            </Box>

            <PrimaryButton
              label="Sair"
              action={doLogout}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    gap: THEME.sizes.paddingPage * 2,
  },
  section: {
    display: `flex`,
    gap: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: THEME.fontSizes.lg * 2,
    lineHeight: THEME.fontSizes.lg * 2,
    fontWeight: 'bold',
    color: THEME.colors.white,
  },
  text: {
    textAlign: 'center',
    color: THEME.colors.white,
  },
  pressable: {
    flex: 1,
  },
  gamerPeriodBtn: {
    gap: 10,
  },
  btnNewGame: {
    flexDirection: "row",
    alignItems: `center`,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    padding: 5,
    borderRadius: 30
  }
});