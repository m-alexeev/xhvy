import { ThemeProvider} from '@rneui/themed';
import { theme } from './src/themes/base';
import { NavigationContainer } from '@react-navigation/native';
import RootStackComponent from './src/routes/Root';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStackComponent/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
