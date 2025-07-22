import { CloseIcon, Input, SearchIcon, View } from "native-base";
import { Pressable, StyleSheet } from "react-native";
import { THEME } from "styles/Theme";

interface MyInputProps {
  onChangeText?:any;
  placeholder?:string;
  value?:any;
  rightElementFunction?:any;
}

export function InputComponent({ onChangeText, placeholder, value, rightElementFunction }:MyInputProps) {
  return(
    <View style={styles.searchContainer}>
      <Input
        variant="unstyled"
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        style={{
          fontSize: THEME.fontSizes.md,
        }}
        leftElement={ <SearchIcon size="6" ml={2} color={THEME.colors.font} /> }
        rightElement={
          value && value.length > 0 && (
          <Pressable onPress={rightElementFunction}>
            <CloseIcon size="5" mr={2} color={THEME.colors.font} />
          </Pressable>
        )}
        color={THEME.colors.font}
        borderColor={"transparent"}
        bg={"transparent"}
        selectionColor={THEME.colors.white}
        _focus={{
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
