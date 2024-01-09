import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_EXERCISES } from "../assets/data/exercise_obj";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IExercise } from "@app/types/exercises";
import { produce } from "immer";

type ExerciseState = {
  exercises: Array<IExercise>;
  selectedExercises: Array<IExercise>;
  pending_exercse_updates: Array<IExercise>;
};

type ExerciseAction = {
  createExercise: (exercise: IExercise) => void;
  updateExercise: (exerciseId: string, exercise: IExercise) => void;
  deleteExercise: (exerciseId: string) => void;

  selectExercise: (exercise: IExercise) => void;
  clearSelection: () => void;
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
      selectExercise: (exercise) =>
        set(produce((state: ExerciseState & ExerciseAction) => {
          if (state.selectedExercises.find((e) => e.id === exercise.id)) {
            const index = state.selectedExercises.findIndex((e) =>
              e.id === exercise.id
            );
            state.selectedExercises.splice(index, 1);
          } else {
            state.selectedExercises.push(exercise);
          }
        })),
      clearSelection: () => set((state) => ({ selectedExercises: [] })),
    }),
    {
      name: "exercise-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ((state) => ({ exercises: state.exercises })),
    },
  ),
);

export { useExercise };
