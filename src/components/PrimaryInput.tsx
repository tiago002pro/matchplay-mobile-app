import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { THEME } from "../styles/theme";

export const PrimaryInput:React.FC<PrimaryInputProps> = React.memo(({ type, label, value, onChangeText, isPassword, error }) => {
  const [showPassword, setShowPassword] = useState<boolean>(isPassword || false);

  const rightElement = <TextInput.Icon
    color={error ? THEME.colors.red[500] : THEME.colors.white}
    icon={showPassword ? "eye" : !showPassword ? "eye-off" : ""}
    onPress={() => setShowPassword(!showPassword)}
  />

  return(
    <TextInput
      key={label}
      keyboardType={type ? type : 'default'}
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      textColor={THEME.colors.white}
      secureTextEntry={showPassword}
      right={isPassword ? rightElement : null}
      outlineStyle={{
        borderColor: THEME.colors.white,
        borderRadius: 10,
      }}
      theme={{
        colors: {
          placeholder: THEME.colors.white,
          text: THEME.colors.white,
          primary: THEME.colors.white,
          onSurfaceVariant: THEME.colors.white,
        },
      }}
      style={{
        backgroundColor: THEME.colors.background,
        marginBottom: 20,
      }}
    />
  );
});
