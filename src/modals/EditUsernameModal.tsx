import { PrimaryButton } from "components/PrimaryButton";
import { PrimaryInput } from "components/PrimaryInput";
import { IPerson } from "interfaces/IPerson";
import { View } from "native-base";
import { useState } from "react";
import { Modal, StyleSheet, Text } from "react-native";
import { showMessage } from "react-native-flash-message";
import { PersonService } from "service/PersonService";
import { THEME } from "styles/Theme";

type EditUsernameModalProps = {
  modalVisible:boolean;
  setModalVisible:any;
  person:IPerson;
  setPerson:any;
}

export function EditUsernameModal({ modalVisible, setModalVisible, person, setPerson }:EditUsernameModalProps) {
  const { update } = PersonService();
  const [data, setData] = useState<IPerson>(person);

  function setName(name:string) {
    setData({...person, name: name})
  }

  const save = async () => {
    try {
      setData(data)
      console.log('data', data.name);
      
      const personUpdated = await update(data)
      setPerson(personUpdated)
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
              <Text style={styles.title}>Selecionar nome:</Text>
            </View>

            <PrimaryInput
              label={'Nome'}
              value={data.name}
              onChangeText={setName}
              autoCapitalize={true}
            />

            <View style={styles.footer}>
              <PrimaryButton
                label="Salvar"
                action={() => save()}
                bg={THEME.colors.primary}
              />
              <PrimaryButton label="Cancelar" action={() => closeModal()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    width: '100%',
    padding: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.background,
    position: `absolute`,
    gap: 30,
    display: `flex`,
    justifyContent: `center`,
    alignContent: `center`,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  header: {
    gap: 10,
    position: `relative`
  },
  title: {
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.white,
    textAlign: `center`
  },
  footer: {
    gap: 10,
  }
});
