import { NavigationContainer } from "@react-navigation/native";
import RootStackComponent from "./src/routes/Root";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./src/themes/base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useOptions } from "@app/zustand/optionsStore";

export default function App() {
  const themeMode = useOptions((state) => state.theme);
  let theme = themeMode === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  const [fontsLoaded, fontsError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded || fontsError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <RootStackComponent />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
