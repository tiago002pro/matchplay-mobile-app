import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GamesService } from "../../service/GamesService";
import { FlatList } from "native-base";
import { RawgGames, RawgGamesResponse, SearchRawgGames } from "./interface/rawg-games";
import { RawgGameComponent } from "./components/RawgGameComponent";

export default function Games() {
  const { searchRawgGames } = GamesService();
  const [games, setGames] = useState<RawgGames[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    searchGames()
  }, [page])

  async function searchGames() {
    const filter:SearchRawgGames = {
      page: page,
      pageSize: 10,
      search: ""
    }

    const response:RawgGamesResponse = await searchRawgGames(filter)

    if (response) {
      if (response.games) {
        setGames([...games, ...response.games])
      }

      if (response.hasNext) {
        setHasMore(response.hasNext)
      }
    }
  }

  function handleLoadMore() {
    if (hasMore) {
      setPage(page + 1);
    }
  }

  return(
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={({ item }) => ( <RawgGameComponent game={item}/> )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 10,
    paddingEnd: 10,
    justifyContent: 'center',
    backgroundColor: '#0D0D0D',
  },
  title: {
    color: '#fff',
  }
});
