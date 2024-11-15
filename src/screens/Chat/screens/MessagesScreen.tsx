import { Box, Image, Text, View, VStack } from "native-base";
import { Dimensions, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PersonService } from "../../../service/PersonService";
import { useAuth } from "../../../contexts/AuthContext";
import { IPerson } from "../../../interfaces/IPerson";
import { THEME } from "../../../styles/theme";

const widthScreen = Dimensions.get('screen').width;

export function MessagesScreen() {
  const { getByUserId, searchFriends } = PersonService();
  const { authState } = useAuth();
  const [friends, setFriends] = useState<IPerson[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    loadFriends()
  }, [page])

  async function loadFriends() {
    const response:IPerson[] = await searchFriends(authState?.user?.id, page, "")
    setFriends([...friends, ...response])
    if (response.length === 0) setHasMore(false)
  }

  function handleLoadMore() {
    if (hasMore) setPage(page + 1)
  }

  return(
    <VStack style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(data:any) => data.id.toString()}
        renderItem={({ item }) => <Friend friend={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={7}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: THEME.colors.background,
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

function Friend({ friend }:any) {
  const navigation:any = useNavigation()

  function goToMessages() {
    navigation.navigate('MessagesScreen', {
      friend: friend,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={goToMessages}>
      <View style={friendStyles.container}>
        <Box style={friendStyles.imageContainer}>
          <Box style={friendStyles.circle}></Box>
          <Ionicons
            name="person-circle-outline"
            size={widthScreen - widthScreen * .8}
            color={THEME.colors.primary}
          />
          {
            friend?.profileImage && <Image source={{ uri: friend?.profileImage }} alt={'profileImage'} style={friendStyles.userImage} />
          }
        </Box>
        <Box>
          <Text color={'white'}>{friend?.name}</Text>
        </Box>
      </View>
    </TouchableWithoutFeedback>
  );
}

const friendStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.header,
    marginBottom: 10,
    borderRadius: 10
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: widthScreen - widthScreen * .861,
    width: widthScreen - widthScreen * .861,
    height: widthScreen - widthScreen * .861,
    borderWidth: widthScreen * .008,
    borderColor: THEME.colors.background,
    zIndex: 999999,
    position: 'absolute',
  },
  userImage: {
    width: widthScreen - widthScreen * .861,
    height: widthScreen - widthScreen * .861,
    borderRadius: widthScreen - widthScreen * .861,
    position: 'absolute',
  },
});