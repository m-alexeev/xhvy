import { OptionsState, OptionsStoreType } from "@app/types/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useOptions = create<OptionsStoreType>()(
  persist(
    (set) => ({
      theme: "dark",
      units: "metric",
      updateOption: (option, value) =>
        set(produce((state: OptionsState) => {
          state[option] = value;
        })),
    }),
    {
      name: "options-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useOptions};
