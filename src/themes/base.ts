import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { fontConfigCustom } from "./fonts";
import { Dimensions } from "react-native";

const MaterialDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  mode: "exact",
  fonts: fontConfigCustom,
  roundness: 3,
  colors: {
    primary: "rgb(220, 184, 255)",
    onPrimary: "rgb(71, 12, 122)",
    primaryContainer: "rgb(95, 43, 146)",
    onPrimaryContainer: "rgb(240, 219, 255)",
    secondary: "rgb(208, 193, 218)",
    onSecondary: "rgb(54, 44, 63)",
    secondaryContainer: "rgb(77, 67, 87)",
    onSecondaryContainer: "rgb(237, 221, 246)",
    tertiary: "rgb(243, 183, 190)",
    onTertiary: "rgb(75, 37, 43)",
    tertiaryContainer: "rgb(101, 58, 65)",
    onTertiaryContainer: "rgb(255, 217, 221)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(29, 27, 30)",
    onBackground: "rgb(231, 225, 229)",
    surface: "rgb(29, 27, 30)",
    onSurface: "rgb(231, 225, 229)",
    surfaceVariant: "rgb(74, 69, 78)",
    onSurfaceVariant: "rgb(204, 196, 206)",
    outline: "rgb(150, 142, 152)",
    outlineVariant: "rgb(74, 69, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(231, 225, 229)",
    inverseOnSurface: "rgb(50, 47, 51)",
    inversePrimary: "rgb(120, 69, 172)",
    elevation: {
      level0: "transparent",
      level1: "rgb(39, 35, 41)",
      level2: "rgb(44, 40, 48)",
      level3: "rgb(50, 44, 55)",
      level4: "rgb(52, 46, 57)",
      level5: "rgb(56, 49, 62)",
    },
    surfaceDisabled: "rgba(231, 225, 229, 0.12)",
    onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)",
  },
};

const MaterialLightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: fontConfigCustom,
  colors: {
    primary: "rgb(52, 61, 255)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(224, 224, 255)",
    onPrimaryContainer: "rgb(0, 0, 110)",
    secondary: "rgb(92, 93, 114)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(225, 224, 249)",
    onSecondaryContainer: "rgb(25, 26, 44)",
    tertiary: "rgb(120, 83, 107)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 216, 238)",
    onTertiaryContainer: "rgb(46, 17, 38)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(228, 225, 236)",
    onSurfaceVariant: "rgb(70, 70, 79)",
    outline: "rgb(119, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 239, 244)",
    inversePrimary: "rgb(190, 194, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(245, 242, 255)",
      level2: "rgb(239, 236, 255)",
      level3: "rgb(233, 230, 255)",
      level4: "rgb(231, 228, 255)",
      level5: "rgb(227, 224, 255)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(48, 48, 56, 0.4)",
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MaterialLightTheme,
  ...LightTheme,
  colors: {
    ...MaterialLightTheme.colors,
    ...LightTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...MaterialDarkTheme,
  ...DarkTheme,
  colors: {
    ...MaterialDarkTheme.colors,
    ...DarkTheme.colors,
  },
};

const screenDimensions = Dimensions.get("screen");

export { CombinedDarkTheme, CombinedDefaultTheme, screenDimensions };
