import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "native-base";
import { ActivityIndicator } from "react-native-paper";

import { THEME } from "styles/Theme";
import { RawgGame } from "../../components/RawgGame";
import { InputComponent } from "../../components/InputComponent";
import { platformIcons } from "shared/platformIcons";
import { PlatformsFilter } from "shared/platformsFilter";

import { GamesService } from "../../service/GamesService";

import { IRawgGamesResponse } from "../../interfaces/IGames";
import { EmptyData } from "components/EmptyData";
import { Filter } from "lucide-react-native";
import { GradientBackground } from "components/GradientBackground";

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
  const [showFilters, setShowFilters] = useState(false);

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
    clearPlatforms();
  }

  function clearPlatforms() {
    setPlatforms([]);
    setPlatformName("");
  }

  function scrollToTop() {
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <Text style={styles.filterTitle}>Plataforma</Text>
        <View style={styles.filterOptions}>
          <TouchableOpacity
            style={[styles.filterChip, !platformName && styles.filterChipActive]}
            onPress={clearPlatforms}
          >
            <Text style={[styles.filterChipText, !platformName && styles.filterChipTextActive]}>
              Todas
            </Text>
          </TouchableOpacity>

        {
          PlatformsFilter.map((platform, index) => {
            const IconComponent = platformIcons[platform.name];
            return IconComponent ? (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterChip,
                  platform.name === platformName && styles.filterChipActive
                ]}
                onPress={() => setFilter(platform)}
              >
                <IconComponent style={styles.iconComponent} />
                <Text
                  style={[
                    styles.filterChipText,
                    platform.name === platformName && styles.filterChipTextActive]}
                  >
                  {platform.name}
                </Text>
              </TouchableOpacity>
            ) : null;
          })
        }
      </View>
    </View>
  );

  const renderRawgGame = useCallback(({ item }:any) => {
    return <RawgGame game={item} />
  }, [games])

  return(
    <SafeAreaView style={styles.safeAreaView}>
      <GradientBackground>
        <View style={styles.searchContainer}>
          <View style={styles.input}>
            <InputComponent
              key={'GAMES'}
              onChangeText={onChangeSearch}
              placeholder={"Busque jogos"}
              value={search}
              rightElementFunction={clearInput}
            />
          </View>

          <TouchableOpacity
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={showFilters ? "#FFFFFF" : "#8B5CF6"} />
          </TouchableOpacity>
        </View>

        {showFilters && renderFilters()}

        <FlatList
          ref={listRef}
          data={games}
          renderItem={renderRawgGame}
          keyExtractor={(item) => String(item.id)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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

        <EmptyData
          dataList={games}
          title="Opss..."
          text="Nenhum jogo encontrado."
        />
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    paddingStart: THEME.sizes.paddingPage,
    paddingEnd: THEME.sizes.paddingPage,
    paddingTop: THEME.sizes.paddingPage,
    backgroundColor: "#1a1a2e",
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: THEME.sizes.paddingPage,
    gap: THEME.sizes.paddingPage / 2,
  },
  input: {
    flex: 1,
  },
  filtersContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: THEME.sizes.paddingPage,
    padding: THEME.sizes.paddingPage,
    marginBottom: THEME.sizes.paddingPage,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  filterTitle: {
    fontSize: THEME.fontSizes.md,
    fontFamily: 'Inter-SemiBold',
    color: THEME.colors.font,
    marginBottom: THEME.sizes.paddingPage,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.sizes.paddingPage / 2,
  },
  filterChip: {
    flexDirection: `row`,
    alignItems: `center`,
    paddingHorizontal: THEME.sizes.paddingPage / 2,
    paddingVertical: THEME.sizes.paddingPage / 2,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  filterChipActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  filterChipText: {
    fontSize: THEME.fontSizes.sm,
    fontFamily: 'Inter-SemiBold',
    color: '#CCCCCC',
  },
  filterChipTextActive: {
    color: THEME.colors.font,
  },
  iconComponent: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  filterButtonActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
});
