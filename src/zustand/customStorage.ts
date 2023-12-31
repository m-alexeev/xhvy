import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStorage } from "zustand/middleware";
import superjson from "superjson";

export function CustomStorage<T>(): PersistStorage<T> {
  return {
    getItem: async (name) => {
      const str = await AsyncStorage.getItem(name);
      if (!str) return null;
      return superjson.parse(str);
    },
    setItem: async (name, value) => {
      await AsyncStorage.setItem(name, superjson.stringify(value));
    },
    removeItem: async (name) => await AsyncStorage.removeItem(name),
  };
}

