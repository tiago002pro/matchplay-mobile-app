import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FlatList } from "native-base";
import { ActivityIndicator } from "react-native-paper";

import { THEME } from "styles/Theme";
import { RawgGame } from "../../components/RawgGame";
import { InputComponent } from "../../components/InputComponent";

import { GamesService } from "../../service/GamesService";

import { IRawgGamesResponse } from "../../interfaces/IGames";

export function GamesScreen() {
  const pageSize = 10;
  const { searchRawgGames } = GamesService();
  const [games, setGames] = useState<RawgGames[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGames = async (newSearch = false) => {
    setLoading(true);

    const response:IRawgGamesResponse = await searchRawgGames(page, pageSize, search);
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
    <RawgGame game={item} />
  );

  return(
    <SafeAreaView style={styles.safeAreaView}>
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
          ListFooterComponent={
            loading ? 
              <ActivityIndicator
                size="large"
                color={THEME.colors.primary}
                style={{marginTop: 300}}
              />
            : null
          }
          initialNumToRender={10} // Carrega apenas 10 itens inicialmente
          maxToRenderPerBatch={5} //Define o número máximo de itens que serão renderizados em cada ciclo de renderização.
          windowSize={3} //Define quantas páginas (grupos de itens) renderizar por vez.
          removeClippedSubviews={true} // Economiza memória ao remover itens fora da tela
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.background,
  },
});
