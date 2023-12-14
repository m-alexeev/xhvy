import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ITheme {
  toggleTheme: () => void;
  isThemeDark: boolean;
}

const ThemeContext = createContext<ITheme>({
  toggleTheme: () => {},
  isThemeDark: true,
});

interface ThemeProps {
  children: ReactNode;
}

const ThemeProvider:FC<ThemeProps> = ({children}) => {
  const [isThemeDark, setIsThemeDark] = useState(true);

  //TODO: Add saving theme to storage

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [isThemeDark, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={preferences}>
      {children}
    </ThemeContext.Provider>
  );
};


const useThemeSwitch = () => useContext(ThemeContext) as ITheme;
export {ThemeProvider, useThemeSwitch};
