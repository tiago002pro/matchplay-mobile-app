import { Ionicons } from "@expo/vector-icons";
import { Box, Image } from "native-base";
import { THEME } from "../styles/Theme";
import { Alert, Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { PersonService } from "../service/PersonService";
import { Person } from "../interface/person.interface";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const widthScreen = Dimensions.get('screen').width;

interface ProfileImagePickerProps {
  person:Person;
  setPerson:any;
}

export default function ProfileImagePicker({ person, setPerson }:ProfileImagePickerProps) {
  function handleImageProfile() {
    Alert.alert(
      "Selecione uma imagem",
      "Selecione uma imagem para o perfil",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Galeria",
          onPress: async () => await pickImageFromGalery(setPerson, person),
          style: 'default'
        },
        {
          text: "Câmera",
          onPress: async () => await pickImageFromCamera(setPerson, person),
          style: 'default'
        },
      ],
      {
        cancelable: true,
      },
    )
  };

  return (
    <TouchableWithoutFeedback onPress={handleImageProfile}>
      <Box style={styles.imageContainer}>
        <Box style={styles.circle}></Box>
        <Ionicons
          name="person-circle-outline"
          size={widthScreen}
          color={THEME.colors.primary}
        />
        {
          person?.profileImage && <Image source={{ uri: person?.profileImage }} alt={'profileImage'} style={styles.userImage} />
        }
      </Box>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: widthScreen,
    height: widthScreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: widthScreen - widthScreen * .27,
    width: widthScreen - widthScreen * .27,
    height: widthScreen - widthScreen * .27,
    borderWidth: widthScreen * .03,
    borderColor: THEME.colors.background,
    zIndex: 999999,
    position: 'absolute',
  },
  userImage: {
    width: widthScreen - widthScreen * .32,
    height: widthScreen - widthScreen * .32,
    borderRadius: widthScreen - widthScreen * .32,
    position: 'absolute',
  },
});

const pickImageFromGalery = async (setPerson:any, person:Person) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("São necessárias permissões da galeria")
  } else {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (!person || !person?.id) {
        Alert.alert("Usuário não encontrado")
      } else {
        setPerson({ ...person, profileImage: result.assets[0].uri })
        await uploadImage(result.assets[0].uri, person, setPerson)
      } 
    }
  }
}

const pickImageFromCamera = async (setPerson:any, person:Person) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  
  if (status !== "granted") {
    Alert.alert("São necessárias permissões da câmera")
    await ImagePicker.requestCameraPermissionsAsync()
  } else {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      if (!person || !person?.id) {
        Alert.alert("Usuário não encontrado")
      } else {
        setPerson({ ...person, profileImage: result.assets[0].uri })
        await uploadImage(result.assets[0].uri, person, setPerson)
      } 
    }
  }
}

async function uploadImage(file:any, person:Person, setPerson:any) {
  const { uploadImageProfile } = PersonService();

  if (!file) {
    Alert.alert('Please select an image first.');
    return;
  }

  const formData:any = new FormData();
  formData.append("photo", {
    uri: file,
    type: 'image/jpeg',
    name: 'profile.jpg',
  });

  const response = await fetch(file);
  const blob = await response.blob();
  const storageRef  = ref(storage, `/images/users/${person.id}`);

  uploadBytesResumable(storageRef, blob).then((snapshot) => getDownloadURL(snapshot.ref)).then(async (downloadURL:any) => {
    await uploadImageProfile(person.id, downloadURL)
    setPerson({ ...person, profileImage: downloadURL })
  })
}