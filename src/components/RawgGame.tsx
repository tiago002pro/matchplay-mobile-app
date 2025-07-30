import { Image, Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { THEME } from "styles/Theme";
import React, { useState } from "react";
import { platformIcons } from "shared/platformIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Star } from "lucide-react-native";
import { PrimaryButton } from "./PrimaryButton";
import moment from "moment";
import { EditGameModal } from "modals/EditGameModal";

export function RawgGame({ game }:RawgGameProps) {
  const [addGameModalVisible, setAddGameModalVisible] = useState<boolean>(false);

  async function openModal() {
    setAddGameModalVisible(true)
  }

  return (
    <TouchableOpacity
      style={[styles.container]}
      key={game.id}
    >
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.05)']}
        style={styles.gradient}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.gameImage}
            source={{uri: game.backgroundImage}}
            alt={game.name}
            resizeMode="cover"
          />

          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{game.metacritic}</Text>
          </View>
        </View>

        <View style={styles.gameInfo}>
          <Text style={styles.gameName} numberOfLines={2}>
            {game.name}
          </Text>

          {/* <Text style={styles.gameDescription} numberOfLines={2}>
            Descrição do jogo.
          </Text> */}

            <View style={styles.gameDetails}>
              {/* <Text style={styles.developer} numberOfLines={1}>
                Densenvolvedor
              </Text> */}

              {
                game.releaseDate && <View style={styles.detailItem}>
                  <Calendar size={12} color="#666" />
                  <Text style={styles.detailText}>
                    {moment(game.releaseDate).format('LL')}
                  </Text>
                </View>
              }

              {/* <View style={styles.detailItem}>
                <Users size={12} color="#10B981" />
                <Text style={[styles.detailText, { color: '#10B981' }]}>
                  Multijogadores
                </Text>
              </View> */}

              <View style={styles.platformsContainer}>
                {game.platforms.map((platform, index) => {
                  const IconComponent = platformIcons[platform.name];
                  return IconComponent ? (
                    <View key={index} style={styles.platforms}>
                      <IconComponent style={styles.iconComponent} />
                      <Text style={styles.iconName}>{platform.name}</Text>
                    </View>
                  ) : null;
                })}
              </View>
          </View>
        </View>

        <PrimaryButton 
          label="Adicionar"
          bg={THEME.colors.primary}
          action={() => openModal()}
        />

        {
          addGameModalVisible && <EditGameModal
            modalVisible={addGameModalVisible}
            setModalVisible={setAddGameModalVisible}
            idRawgGame={game.id}
          />
        }
      </LinearGradient>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  compactContainer: {
    marginBottom: 12,
  },
  gradient: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  gameImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
   ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  gameInfo: {
    flex: 1,
    marginBottom: 12,
  },
  gameName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 8,
  },
  gameDetails: {
    marginBottom: 8,
  },
  developer: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  platformsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", 
    marginTop: 5,
  },
  platforms: {
    flexDirection: "row",
    justifyContent: `center`,
    alignItems: `center`,
    marginEnd: 10,
    marginBottom: 4,
  },
  iconComponent: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  iconName: {
    color: THEME.colors.font,
  }
});
