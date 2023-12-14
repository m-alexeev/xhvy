import { NavigationContainer } from "@react-navigation/native";
import RootStackComponent from "./src/routes/Root";
import { OptionsProvider } from "./src/contexts/OptionsContext";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./src/themes/base";
import { ThemeProvider, useThemeSwitch } from "./src/contexts/ThemeContext";


const AppWrapper = () => {
  const {isThemeDark} = useThemeSwitch(); 
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <OptionsProvider>
          <RootStackComponent />
        </OptionsProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}


export default function App() {
  return (
    <ThemeProvider>
      <AppWrapper/>
    </ThemeProvider>
  );
}
