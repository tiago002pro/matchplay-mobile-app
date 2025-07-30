import { IPerson } from "interfaces/IPerson";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { THEME } from "styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, MapPin, Star, X } from "lucide-react-native";
import { platformIcons } from "shared/platformIcons";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import moment from "moment";

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;
const width = widthScreen * .7;

type MatchCardProps = {
  person:IPerson;
  pointerEvents:any
  onLike: () => {},
  onDislike: () => {},
  onSuperLike: () => {}
}

export function MatchCard( { person, pointerEvents, onLike, onDislike, onSuperLike } : MatchCardProps ) {

  const getYears = (dateBirth: string) => {
    return moment().diff(dateBirth, 'years');
  }

  const renderGameTag = (game) => (
    <View style={styles.gameTag}>
      <Text style={styles.gameTagText}>{game.name}</Text>
        {game.platforms.map((platform) => {
          const IconComponent = platformIcons[platform.name];
          if (!IconComponent) return null;

          return (
            <View key={`${game.name}-${platform.name}`} style={styles.platforms}>
              <IconComponent style={styles.iconComponent} />
            </View>
          );
        })}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.1)']}
          style={styles.cardGradient}
        >
          <View style={styles.imageContainer}>
            <View style={styles.circle}></View>
            <Ionicons
              name="person-circle-outline"
              size={width}
              color={'rgba(139, 92, 246, 0.1)'}
            />
            {
              person?.profileImage && <Image source={{ uri: person?.profileImage }} alt={'profileImage'} style={styles.userImage} />
            }
          </View>

          <ScrollView style={styles.profileInfo} showsVerticalScrollIndicator={false}>
            <View style={styles.basicInfo}>
              {
                person.name &&
                  <Text style={styles.profileName}>
                    {person.name}{!!person.dateBirth ? ', ' + getYears(person.dateBirth) : ''}
                  </Text>
              }

              {
                person.city && person.state &&
                  <View style={styles.locationContainer}>
                    <MapPin size={16} color="#EC4899" />
                      <Text style={styles.locationText}>
                        {person.city}, {person.state}
                      </Text>
                  </View>
              }
            </View>

            {
              !!person.gamerProfile.bio && 
                <Text style={styles.bio}>{person.gamerProfile.bio}</Text>
            }


            {
              person.gamerProfile && person.gamerProfile.games && person.gamerProfile.games.length &&
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Jogos Favoritos:</Text>
                  <View style={styles.gamesList}>
                    { person.gamerProfile.games.map(renderGameTag) }
                  </View>
                </View>
            }
          </ScrollView>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={onDislike}
            >
              <X size={32} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.superLikeButton]}
              onPress={onSuperLike}
            >
              <Star size={28} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.likeButton]}
              onPress={onLike}
            >
              <Heart size={32} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    flex: 1,
    padding: THEME.sizes.paddingPage,
  },
  card: {
    flex: 1,
    height: heightScreen,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  cardGradient: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: width - width * .27,
    width: width - width * .27,
    height: width - width * .27,
    borderWidth: width * .03,
    borderColor: 'rgba(236, 72, 153, 0.1)',
    zIndex: 999999,
    position: 'absolute',
  },
  userImage: {
    width: width - width * .32,
    height: width - width * .32,
    borderRadius: width - width * .32,
    position: 'absolute',
  },
  profileInfo: {
    flex: 1,
    padding: 20,
  },
  basicInfo: {
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EC4899',
  },
  bio: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {},
  text: {
    textAlign: 'center',
    color: THEME.colors.font,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  gamesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gameTag: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  gameTagText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    // color: '#8B5CF6',
    color: THEME.colors.font,
  },
  platforms: {
    flexDirection: "row",
  },
  iconComponent: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 30,
    gap: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  superLikeButton: {
    backgroundColor: '#06B6D4',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  likeButton: {
    backgroundColor: '#10B981',
  },
});
