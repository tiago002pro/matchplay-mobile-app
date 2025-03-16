import { Icon, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "styles/Theme";

export const returnBtn = () => {
  const navigation = useNavigation();
    
  return (
    <IconButton
      onPress={() => navigation.goBack()}
      icon={ <Icon as={MaterialIcons} name="arrow-back-ios"/> }
      borderRadius={'full'}
      _icon={{ color: THEME.colors.font, size: 5,  left: 1 }}
      _pressed={{ backgroundColor: THEME.colors.primary, _icon: { color: THEME.colors.font } }}
      style={{ marginLeft: THEME.sizes.paddingPage }}
    />
  );
}