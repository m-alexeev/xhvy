import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_EXERCISES } from "../assets/data/exercise_obj";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IExercise } from "@app/types/exercises";

type ExerciseState = {
  exercises: Array<IExercise>;
  pending_exercse_updates: Array<IExercise>;
};

type ExerciseAction = {
  createExercise: (exercise: IExercise) => void;
  updateExercise: (exerciseId: string, exercise: IExercise) => void;
  deleteExercise: (exerciseId: string) => void;
};

const useExercise = create<ExerciseState & ExerciseAction>()(
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
