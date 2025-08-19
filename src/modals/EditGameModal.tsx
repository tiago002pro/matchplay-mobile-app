import { useFocusEffect } from "@react-navigation/native";
import { GradientBackground } from "components/GradientBackground";
import { PrimaryButton } from "components/PrimaryButton";
import { useAuth } from "contexts/AuthContext";
import { IGame, IGamePlatform } from "interfaces/IGames";
import React, { useEffect } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { GamerProfileService } from "service/GamerProfileService";
import { GamesService } from "service/GamesService";
import { platformIcons } from "shared/platformIcons";
import { THEME } from "styles/Theme";

type EditGameModalProps = {
  modalVisible:boolean;
  setModalVisible:any;
  idRawgGame:number;
}

export function EditGameModal({ modalVisible,  setModalVisible, idRawgGame }: EditGameModalProps) {
  const { authState } = useAuth();
  const { getRawgGamesGameById, getByIdRawgGameAndGamerProfile, deleteGame, update } = GamesService();
  const { addGameToProfile } = GamerProfileService();

  const [game, setGame] = React.useState<IGame>(null);
  const [gameDataPlatforms, setGameDataPlatforms] = React.useState<IGamePlatform[]>([]);
  const [rawgGame, setRawgGame] = React.useState<RawgGames>(null);
  
  useFocusEffect(
    React.useCallback(() => {
      loadGame();
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      setGame((prev) => {
        const updatedGame = { ...prev, platforms: gameDataPlatforms };
        saveGame(updatedGame); // Chamamos update com o estado atualizado
        return updatedGame; // Retornamos o novo estado para garantir que a atualização ocorra corretamente
      });
    };
  
    if (gameDataPlatforms.length > 0) {
      fetchData();
    }
  }, [gameDataPlatforms]);
  

  async function loadGame() {
    const rawgGamesResult: RawgGames = await getRawgGamesGameById(idRawgGame);
    if (rawgGamesResult) {
      setRawgGame(rawgGamesResult);
    }

    if (authState && authState?.user?.gamerProfileId) {
      const gameResult: IGame = await getByIdRawgGameAndGamerProfile(idRawgGame, authState?.user?.gamerProfileId);
      
      if (gameResult) {
        console.log("gameResult", gameResult);
        setGame(gameResult);
        setGameDataPlatforms(gameResult.platforms);
      } else {
        setGame({
          id: null,
          name: rawgGame.name,
          image: rawgGame.backgroundImage,
          idRawgGame: rawgGame.id,
          platforms: [],
          releaseDate: rawgGame.releaseDate,
        });
      }
    }
  }

  const togglePlatform = (platform) => {
    setGameDataPlatforms((prev) => {
      const isSelected = prev.some((p) => p.name === platform.name);

      if (isSelected) {
        return prev.filter((p) => p.name !== platform.name);
      } else {
        const newPlatform: IGamePlatform = {
          id: null,
          name: platform.name,
          idRawgGame: platform.id,
        }
        return [...prev, newPlatform];
      }
    });
  };

  const savePlatforms = async (platform) => {
    const request = {
      id: game.id,
      name: game.name,
      backgroundImage: game.image,
      idPlatform: platform.id,
      namePlatform: platform.name,
    }  
    const response = await addGameToProfile(authState?.user?.gamerProfileId, request);
    showMessage({
      message: response + "!",
      type: "success",
      duration: 2000
    })
  }

  const saveGame = async (updatedGame) => {
    const response = await update(updatedGame);
    showMessage({
      message: response + "!",
      type: "success",
      duration: 2000
    })
  }

  const toggleDeleteGame = async () => {
    try {
      const response:any = await deleteGame(game.id);
      showMessage({
        message: response,
        type: "success",
        duration: 2000
      })
    } catch(e) {
      console.error(e);
    } finally {
      closeModal()
    }
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Modal
          animationType="fade" // "slide", "fade" ou "none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >

          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Editar Jogo:</Text>

              <View style={styles.imageArea}>
                {
                  rawgGame && rawgGame.backgroundImage && rawgGame.name &&
                  <Image
                    style={styles.image}
                    source={{uri: rawgGame.backgroundImage}}
                    alt={rawgGame.name}
                  />
                }
                
                {
                  rawgGame && rawgGame.name &&
                  <Text style={styles.gameName}>{rawgGame.name}</Text>
                }
              </View>

              <Text style={styles.title}>Adicione este jogo ao seu perfil em:</Text>

              <View style={styles.platformsContainer}>
                {rawgGame && rawgGame.platforms && rawgGame.platforms.map((platform, index) => {
                  const IconComponent = platformIcons[platform.name];
                  const isSelected = gameDataPlatforms && gameDataPlatforms.some((item) => item.name === platform.name);
                  
                  return IconComponent ? (
                    <Pressable key={index} style={isSelected ? [styles.platforms, styles.platformActive] : styles.platforms} onPress={() => togglePlatform(platform)}>
                      <Text style={styles.gameTagText}>{platform.name}</Text>
                      <IconComponent style={styles.iconComponent} />
                    </Pressable>
                  ) : null;
                })}
              </View>

              <Text style={styles.title}>Desmarcar todas as plataformas removerá esse jogo da lista</Text>

              <View style={styles.footer}>
                <PrimaryButton
                  label="Remover da listagem"
                  action={toggleDeleteGame}
                  loading={false}
                />
                <PrimaryButton
                  label="Fechar"
                  action={closeModal}
                  loading={false}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </GradientBackground>
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
    padding: 20,
    borderRadius: 20,
    position: 'absolute',
    gap: 30,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    backgroundColor: '#1a1a2e',
    borderColor: '#0f3460',
  },
  title: {
    fontSize: THEME.fontSizes.sm,
    color: THEME.colors.white,
    textAlign: 'center',
  },
  imageArea: {
    borderRadius: 200,
    justifyContent: `center`,
    alignItems: `center`,
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  gameName: {
    fontWeight: `bold`,
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.white,
    textAlign: 'center'
  },
  platformsContainer: {
    justifyContent: `center`,
    flexDirection: "row",
    flexWrap: `wrap`,
    gap: 5,
  },
  gameTagText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: THEME.colors.font,
    marginRight: 10,
  },
  platforms: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  platformActive: {
    flexDirection: "row",
    justifyContent: `center`,
    alignItems: `center`,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginEnd: 5,
    marginBottom: 5,
    borderRadius: 30,
    backgroundColor: '#8B5CF6',
  },
  iconComponent: {
    width: 15,
    height: 15,
  },
  iconName: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.sm - 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: `center`,
    gap: 10,
  },
});
