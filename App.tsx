import { NavigationContainer } from "@react-navigation/native";
import RootStackComponent from "./src/routes/Root";
import { OptionsProvider } from "./src/contexts/OptionsContext";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./src/themes/base";
import { ThemeProvider, useThemeSwitch } from "./src/contexts/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";

const AppWrapper = () => {
  const { isThemeDark } = useThemeSwitch();
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const [fontsLoaded, fontsError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded || fontsError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <OptionsProvider>
            <RootStackComponent />
          </OptionsProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
}
