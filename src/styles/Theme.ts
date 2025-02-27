import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: '#8A2BE2',
    secondary: '#382b73',
    orange: '#f17900',
    background: '#0D0D0D',
    tabbar: '#030303',
    header: '#111111',
    font: '#e0e0e0',
    modalContainerBg: "rgba(0,0,0,0.7)",
    newPrimary: `#faad7f`,
    newSecondary: `#35abc0`,
    newBackgroud: `#382b73`,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    paddingPage: 20,
    borderRadius: 30,
    heightTabBar: 70,
  },
});