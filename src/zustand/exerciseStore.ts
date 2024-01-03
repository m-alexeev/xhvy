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
  updateExercise: (exercise_id: string, exercise: IExercise) => void;
  deleteExercise: (exercise_id: string) => void;
};

const ExerciseStore = create<ExerciseState & ExerciseAction>()(
  persist(
    (set) => ({
      exercises: DEFAULT_EXERCISES,
      pending_exercse_updates: [],
      createExercise: (exercise) =>
        set((state) => ({ exercises: [...state.exercises, exercise] })),
      updateExercise: (exercise_id, exercise) =>
        set((state) => ({
          exercises: state.exercises.map((obj) =>
            obj.id === exercise_id ? { ...exercise } : obj
          ),
        })),
      deleteExercise: (exercise_id) =>
        set((state) => ({
          exercises: [...state.exercises.filter((e) => e.id !== exercise_id)],
        })),
    }),
    {
      name: "exercise-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { ExerciseStore };
