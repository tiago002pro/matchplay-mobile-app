import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GamesService } from "../../service/GamesService";
import { FlatList } from "native-base";
import { RawgGames, RawgGamesResponse } from "./interface/rawg-games";
import { RawgGameComponent } from "./components/RawgGameComponent";
import { ActivityIndicator } from "react-native-paper";
import { THEME } from "../../styles/Theme";
import { InputComponent } from "../../components/InputComponent";

export default function GamesScreen() {
  const pageSize = 10;
  const { searchRawgGames } = GamesService();
  const [games, setGames] = useState<RawgGames[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGames = async (newSearch = false) => {
    setLoading(true);

    const response:RawgGamesResponse = await searchRawgGames(page, pageSize, search);
    if (response.games) {
      setGames(newSearch ? response.games : [...games, ...response.games]);
    }

    if (response.hasNext) {
      setHasMore(response.hasNext)
    }

    setLoading(false);
  }

  // Atualizar busca ao mudar o termo de pesquisa
  useEffect(() => {
    if (search) {
      setPage(1);
      fetchGames(true);
    }
  }, [search]);

  // Função para carregar mais itens quando o usuário chega ao fim da lista
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
      fetchGames();
    }
  }

  const onChangeSearch = (text:string) => {
    clearInput()
    setSearch(text);
  }

  function clearInput() {
    setSearch('')
    setGames([])
    setPage(1)
    setHasMore(false)
  }

  // Renderizar o item do jogo
  const renderItem = ({ item }: { item: RawgGames }) => (
    <RawgGameComponent game={item} />
  );

  return(
    <View style={styles.container}>
      <InputComponent
        key={'GAMES'}
        onChangeText={onChangeSearch}
        placeholder={"Busque jogos"}
        value={search}
        rightElementFunction={clearInput}
      />

      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={THEME.colors.primary} /> : null}
        initialNumToRender={10} // Carrega apenas 10 itens inicialmente
        maxToRenderPerBatch={5} //Define o número máximo de itens que serão renderizados em cada ciclo de renderização.
        windowSize={3} //Define quantas páginas (grupos de itens) renderizar por vez.
        removeClippedSubviews={true} // Economiza memória ao remover itens fora da tela
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
});
