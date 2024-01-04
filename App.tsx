import { NavigationContainer } from "@react-navigation/native";
import RootStackComponent from "./src/routes/Root";
import { OptionsProvider } from "./src/contexts/OptionsContext";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./src/themes/base";
import { ThemeProvider, useThemeSwitch } from "./src/contexts/ThemeContext";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const AppWrapper = () => {
  const { isThemeDark } = useThemeSwitch();
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

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
