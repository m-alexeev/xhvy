import {create} from "zustand";


type FilterState = {
  search: string;
};

type FilterAction = {
  updateSearch: (search: string) => void;
  clearSearch: () => void;
}


const useFilter = create<FilterState & FilterAction>()(
  (set) => ({
    search: "",
    updateSearch: (search) => set(() => ({search: search})),
    clearSearch: () => set(() => ({search: ""}))
  })
)

export {useFilter};
