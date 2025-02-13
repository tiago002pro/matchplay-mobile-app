import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { THEME } from "../styles/theme";

export const PrimaryInput:React.FC<PrimaryInputProps> = React.memo(({ type, label, value, onChangeText, isPassword, autoCapitalize, error }) => {
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
      textColor={error ? THEME.colors.red[500] : THEME.colors.white}
      secureTextEntry={showPassword}
      right={isPassword ? rightElement : null}
      autoCapitalize={autoCapitalize ? 'words' : "none"}
      outlineStyle={{
        borderColor: error ? THEME.colors.red[500] : THEME.colors.white,
        borderRadius: 10,
      }}
      theme={{
        colors: {
          placeholder: error ? THEME.colors.red[500] : THEME.colors.white,
          text: error ? THEME.colors.red[500] : THEME.colors.white,
          primary: error ? THEME.colors.red[500] : THEME.colors.white,
          onSurfaceVariant: error ? THEME.colors.red[500] : THEME.colors.white,
        },
      }}
      style={{
        backgroundColor: THEME.colors.background,
        marginBottom: 20,
      }}
    />
  );
});
