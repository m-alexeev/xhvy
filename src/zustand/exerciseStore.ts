import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_EXERCISES } from "../assets/data/exercise_obj";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseStoreType } from "@app/types/store";

const useExercise = create<ExerciseStoreType>()(
  persist(
    (set) => ({
      exercises: DEFAULT_EXERCISES,
      selectedExercises: [],
      pending_exercse_updates: [],
      createExercise: (exercise) =>
        set((state) => ({ exercises: [...state.exercises, exercise] })),
      updateExercise: (exerciseId, exercise) =>
        set((state) => ({
          exercises: state.exercises.map((obj) =>
            obj.id === exerciseId ? { ...exercise } : obj
          ),
        })),
      deleteExercise: (exerciseId) =>
        set((state) => ({
          exercises: [...state.exercises.filter((e) => e.id !== exerciseId)],
        })),
    }),
    {
      name: "exercise-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useExercise };
