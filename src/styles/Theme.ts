import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: '#8A2BE2',
    secondary: '#f1c40f',
    background: '#0D0D0D',
    tabbar: '#030303',
    header: '#111111',
    font: '#e0e0e0',
    modalContainerBg: "rgba(0,0,0,0.7)",
  },
  sizes: {
    paddingPage: 20,
    borderRadius: 30,
    heightTabBar: 60,
  },
});