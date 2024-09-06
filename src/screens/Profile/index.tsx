import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Image } from "native-base";
import { THEME } from "../../styles/Theme";
import { MyButton } from "../../components/MyButton";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const widthScreen = Dimensions.get('screen').width;
const user = { id: 1, name: 'Naruto Uzumaki', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfmj6b3-e25a64e8-bb64-4bb6-a2b5-f33b2284ff60.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE4YWNkMzY5LWVhNDQtNDcxYi1hZWViLTllNmU4ZTNlZDlkNVwvZGZtajZiMy1lMjVhNjRlOC1iYjY0LTRiYjYtYTJiNS1mMzNiMjI4NGZmNjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2iUKFMUZS0K0CEEST2fLJFjsMHxE4dxImjGWLn9xSUA' };

export default function ProfileScreen() {
  const { authState, doLogout } = useAuth();
  const [user2, setUser] = useState<any>(authState.user);

  return(
    <View style={styles.container}>
      <Box style={styles.imageContainer}>
        <Box style={styles.circle}></Box>
        <Ionicons
          name="person-circle-outline"
          size={widthScreen}
          color={THEME.colors.primary}
        />
        {
          user.image && <Image source={{ uri: user.image }} alt={user.name} style={styles.userImage} />
        }
      </Box>
      <Box style={styles.userName}>
        <Text style={styles.text}>Nome de usuário</Text>
        <Text style={styles.name}>{authState.isAuthenticated}</Text>
        <Text style={styles.name}>{user2?.name}</Text>
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
  title: {
    color: '#fff',
  },
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