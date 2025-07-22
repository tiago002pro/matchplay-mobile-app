import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ViewProps } from "react-native";
import { THEME } from "styles/Theme";

interface GradientBackgroundProps extends ViewProps {
  children: React.ReactNode;
}

export const GradientBackground = ({ children, style, ...rest }: GradientBackgroundProps) => {
  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={[styles.container, style]}
      {...rest}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: THEME.sizes.paddingPage, 
    paddingHorizontal: THEME.sizes.paddingPage, 
  },
});
