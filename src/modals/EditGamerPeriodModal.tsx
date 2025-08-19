import { Modal, View, Text, StyleSheet } from "react-native";
import { GamerPeriod } from "components/GamerPeriod";
import { useState } from "react";
import { IGamerPeriod } from "interfaces/IPerson";
import { GamerPeriodService } from "service/GamerPeriodService";
import { PrimaryButton } from "components/PrimaryButton";
import { THEME } from "styles/Theme";
import { showMessage } from 'react-native-flash-message';
import { GradientBackground } from "components/GradientBackground";

type EditGamerPeriodModalProps = {
  modalVisible:boolean;
  setModalVisible:any;
  gamerPeriod:IGamerPeriod;
  setGamerPeriod:any;
}

export function EditGamerPeriodModal({ modalVisible, setModalVisible, gamerPeriod, setGamerPeriod }:EditGamerPeriodModalProps) {
  const [data, setData] = useState<IGamerPeriod>(gamerPeriod);
  const { update } = GamerPeriodService();

  const save = async () => {
    try {
      const gamerPeriodUpdated = await update(data)
      setGamerPeriod(gamerPeriodUpdated)
      showMessage({
        message: "Salvo com sucesso.",
        type: "success",
        duration: 3000
      })
      closeModal()
    } catch(error) {
      return
    }
  }

  const closeModal = () => {
    setModalVisible(false)
  }
  
  return(
    <GradientBackground>
      <View style={styles.container}>
        <Modal
          animationType="fade" // "slide", "fade" ou "none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.title}>Dias de Jogos:</Text>
                <Text style={styles.subtitle}>
                  Selecione os dias em que você está mais frequentemente disponível para jogar informando para outros usuários quando vocês poderiam jogar juntos!
                </Text>
              </View>
              <GamerPeriod
                gamerPeriod={data}
                setGamerPeriod={setData}
                pointerEvents={'auto'}
              />
              <View style={styles.footer}>
                <PrimaryButton
                  label="Salvar"
                  action={() => save()}
                />
                <PrimaryButton label="Cancelar" action={() => closeModal()} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.modalContainerBg,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    position: 'absolute',
    gap: 30,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    backgroundColor: '#1a1a2e',
    borderColor: '#0f3460',
  },
  header: {
    gap: 10,
    position: 'relative'
  },
  title: {
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.white,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.white,
    textAlign: 'center',
  },
  footer: {
    gap: 10,
  }
});
