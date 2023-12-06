import { ThemeProvider, Button} from '@rneui/themed';
import { theme } from './src/themes/base';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button title="Hello World"/>
    </ThemeProvider>
  );
}
