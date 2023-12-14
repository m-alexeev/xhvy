import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UnitsType } from "../types/general";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type OptionsType = {
  units: UnitsType;
};


interface OptionsInterface {
  options: OptionsType;
  updateOptions: <K extends keyof OptionsType>(
    option: K,
    value: OptionsType[K],
  ) => void;
}

interface OptionsContextProps {
  children: ReactNode;
}

const DEFAULT_OPTIONS: OptionsType = {
  units: "metric",
}

const OptionsContext = createContext<OptionsInterface | null>(null);

const OptionsProvider: FC<OptionsContextProps> = ({ children }) => {
  const [options, setOptions] = useState<OptionsType>(DEFAULT_OPTIONS);

  useEffect(() => {
    const fetchOptions = async () => {
      const savedOpts = await AsyncStorage.getItem("options");
      if (savedOpts !== null) {
        const parsedOpts = JSON.parse(savedOpts) as OptionsType;
        if (parsedOpts) {
          setOptions(parsedOpts);
        }
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  const updateOptions = <K extends keyof OptionsType>(
    option: K,
    value: OptionsType[K],
  ) => {
    const updateOptions = { ...options };
    updateOptions[option] = value;
    setOptions(updateOptions);
  };

  return (
    <OptionsContext.Provider value={{ options, updateOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};

const useOptions = () => useContext(OptionsContext) as OptionsInterface;

export { OptionsProvider, useOptions };
