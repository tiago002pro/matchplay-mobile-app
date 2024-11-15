import { Button } from "native-base";
import { StyleSheet } from "react-native";
import { THEME } from "../styles/theme";

type PrimaryButtonProps = {
  label?:string;
  action?:any;
}

export function PrimaryButton({ label, action }:PrimaryButtonProps) {
  return (
    <Button
      key={label}
      style={MyButtonStyles.btn}
      onPress={action}
      bg={THEME.colors.background}
      _pressed={{
        backgroundColor: THEME.colors.primary,
      }}
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