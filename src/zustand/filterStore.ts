import { Equipment, MajorMuscleGroup } from "@app/types/exercises";
import { create } from "zustand";
import { produce } from "immer";

type FilterState = {
  search: string;
  filterCategories: (MajorMuscleGroup | Equipment)[];
};

type FilterAction = {
  updateSearch: (search: string) => void;
  clearSearch: () => void;
  updateCategory: (category: MajorMuscleGroup | Equipment) => void;
};

type FilterStoreType = FilterState & FilterAction;

const useFilter = create<FilterStoreType>()(
  (set) => ({
    search: "",
    filterCategories: [],
    updateSearch: (search) => set(() => ({ search: search })),
    clearSearch: () => set(() => ({ search: "" })),
    updateCategory: (category: MajorMuscleGroup | Equipment) =>
      set(
        produce((state: FilterStoreType) => {
          // Toggle category from filter array
          const index = state.filterCategories.findIndex((el) =>
            el === category
          );

          if (index === -1) {
            state.filterCategories.push(category);
          } else {
            state.filterCategories.splice(index, 1);
          }
        }),
      ),
  }),
);

export { useFilter };
