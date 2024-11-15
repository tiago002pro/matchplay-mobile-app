import { CloseIcon, Input, SearchIcon } from "native-base";
import { Pressable } from "react-native";
import { THEME } from "../styles/Theme";

interface MyInputProps {
  onChangeText?:any;
  placeholder?:string;
  value?:any;
  rightElementFunction?:any;
}

export function InputComponent({ onChangeText, placeholder, value, rightElementFunction }:MyInputProps) {
  return(
    <Input
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
      style={{
        fontSize: THEME.fontSizes.md,
      }}
      leftElement={ <SearchIcon size="6" ml={2} color={THEME.colors.font} /> }
      rightElement={
        <Pressable onPress={rightElementFunction}>
          <CloseIcon size="5" mr={2} color={THEME.colors.font} />
        </Pressable>
      }
      color={THEME.colors.font}
      borderColor={THEME.colors.primary}
      bg={THEME.colors.background}
      selectionColor={THEME.colors.white}
      _focus={{
        backgroundColor: THEME.colors.background,
        borderColor: THEME.colors.primary,
        _ios: {
          selectionColor: THEME.colors.primary,
        },
        _android: {
          selectionColor: THEME.colors.primary,
        }
      }}
    />
  );
}
