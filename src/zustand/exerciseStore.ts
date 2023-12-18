import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IExercise } from "../types/exercises";
import { DEFAULT_EXERCISES } from "../assets/data/exercise_obj";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ExerciseState = {
  exercises: Array<IExercise>;
  pending_exercse_updates: Array<IExercise>;
};

type ExerciseAction = {
  createExercise: (exercise: IExercise) => void;
  // updateExercise: (exercise_id: string) => void;
  // deleteExercise: (exercise_id: string) => void;
};


const ExerciseStore = create<ExerciseState & ExerciseAction>()(
  persist(
    (set) => ({
      exercises: DEFAULT_EXERCISES,
      pending_exercse_updates: [],
      createExercise: (exercise) => set((state) => ({ exercises: [...state.exercises, exercise] })),
    }),
    { name: "exercise-storage", storage: createJSONStorage(() => AsyncStorage) },
  )
)

export { ExerciseStore };
