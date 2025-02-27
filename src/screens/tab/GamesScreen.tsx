import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Pressable, Text } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { THEME } from "styles/Theme";
import { RawgGame } from "../../components/RawgGame";
import { InputComponent } from "../../components/InputComponent";
import { platformIcons } from "shared/platformIcons";
import { PlatformsFilter } from "shared/platformsFilter";

import { GamesService } from "../../service/GamesService";

import { IRawgGamesResponse } from "../../interfaces/IGames";

export function GamesScreen() {
  const pageSize = 10;
  const { searchRawgGames } = GamesService();

  const [games, setGames] = useState<RawgGames[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [platforms, setPlatforms] = useState<number[]>([]);
  const [platformName, setPlatformName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const listRef = useRef<FlatList>(null);

  // Atualiza os jogos quando a pesquisa ou plataforma mudar
  useEffect(() => {
    setPage(1);
    fetchGames(true);
    scrollToTop();
  }, [search, platforms]);

  useEffect(() => {
    if (page > 1) fetchGames(false)
  }, [page]);
 

  const fetchGames = async (newSearch = false) => {
    setLoading(true);

    try {
      const response:IRawgGamesResponse = await searchRawgGames(page, pageSize, platforms, search);
      setGames((prevGames) => newSearch ? response.games : [...prevGames, ...response.games])
      setHasMore(response.hasNext);
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
  }

  const setFilter = async (platform) => {
    clearInput()
    setPlatforms(platform.ids)
    setPlatformName(platform.name)
  }

  // Função para carregar mais itens quando o usuário chega ao fim da lista
  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }

  const onChangeSearch = (text:string) => {
    clearInput()
    setSearch(text);
  }

  function clearInput() {
    setSearch("");
    setPlatforms([]);
    setPlatformName("");
  }

  function scrollToTop() {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }

  const renderRawgGame = useCallback(({ item }:any) => {
    return <RawgGame game={item} />
  }, [games])

  return(
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.input}>
          <InputComponent
            key={'GAMES'}
            onChangeText={onChangeSearch}
            placeholder={"Busque jogos"}
            value={search}
            rightElementFunction={clearInput}
          />

          <ScrollView style={styles.filtersContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.filters}>
              {
                PlatformsFilter.map((platform, index) => {
                  const IconComponent = platformIcons[platform.name];
                  return IconComponent ? (
                    <Pressable key={index} style={platform.name === platformName ? styles.platformActive : styles.platform} onPress={() => setFilter(platform)}>
                      <IconComponent style={styles.iconComponent} />
                      <Text style={styles.filterText}>{platform.name}</Text>
                    </Pressable>
                  ) : null;
                })
              }
            </View>
          </ScrollView>
        </View>

        {
          games && games.length > 0 ?
          (
            <FlatList
            ref={listRef}
            data={games}
            renderItem={renderRawgGame}
            keyExtractor={(item) => String(item.id)}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={3} // Carrega apenas 10 itens inicialmente
            maxToRenderPerBatch={10} //Define o número máximo de itens que serão renderizados em cada ciclo de renderização.
            removeClippedSubviews={true} // Economiza memória ao remover itens fora da tela
            ListFooterComponent={
              loading ? <ActivityIndicator
                size="large"
                color={THEME.colors.primary}
                style={{marginTop: 300}}
                />
              : null
            }
          />
          )
          :
          (
            <View style={styles.emptyDataContainer}>
              <MaterialIcons
                name="videogame-asset-off"
                size={70}
                color={THEME.colors.font}
              />
              <Text style={styles.emptyDataText}>Nenhum jogo encontrado.</Text>
            </View>
          )
        }
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
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.background,
  },
  input: {
    width: `100%`,
    marginBottom: THEME.sizes.paddingPage,
  },
  filtersContainer: {
    flexDirection: `row`,
    marginTop: 10,
  },
  filters: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    gap: 5,
  },
  platform: {
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    padding: 10,
    flexDirection: `row`,
    alignItems: `center`,
    borderRadius: 30,
  },
  platformActive: {
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.primary,
    padding: 10,
    flexDirection: `row`,
    alignItems: `center`,
    borderRadius: 30,
  },
  iconComponent: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  filterText: {
    color: THEME.colors.font,
  },
  emptyDataContainer: {
    height: `100%`,
    alignItems: `center`,
    gap: 10,
    paddingTop: `50%`
  },
  emptyDataText: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.lg
  },
});
