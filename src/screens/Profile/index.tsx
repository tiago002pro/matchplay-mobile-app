import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  title: {
    color: '#fff',
  }
});