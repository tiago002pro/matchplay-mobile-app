import { Button } from "native-base";
import { StyleSheet } from "react-native";
import { THEME } from "styles/Theme";

type PrimaryButtonProps = {
  label?:string;
  action?:any;
  color?:string;
  bg?:any;
  isDisabled?:boolean;
}

export function PrimaryButton({ label, action, bg, color, isDisabled, ...props }:PrimaryButtonProps) {
  return (
    <Button
      key={label}
      isDisabled={isDisabled}
      style={MyButtonStyles.btn}
      onPress={action}
      bg={bg || THEME.colors.background}
      _pressed={{
        backgroundColor: THEME.colors.primary,
      }}
      _text={{
        fontSize: THEME.fontSizes.md,
        color: color || THEME.colors.white,
      }}
      {...props}
    >
    {label}
    </Button>
  );
}

const MyButtonStyles = StyleSheet.create({
  btn: {
    borderColor: THEME.colors.primary,
    borderWidth: 2,
    borderRadius: 10,
  }
})