import { ThemeProvider } from "@rneui/themed";
import { theme } from "./src/themes/base";
import { NavigationContainer } from "@react-navigation/native";
import RootStackComponent from "./src/routes/Root";
import { OptionsProvider } from "./src/contexts/OptionsContext";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <OptionsProvider>
        <NavigationContainer>
          <RootStackComponent />
        </NavigationContainer>
      </OptionsProvider>
    </ThemeProvider>
  );
}
