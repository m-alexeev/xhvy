import { create } from "zustand";
import { produce } from "immer";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  IWorkout,
  IWorkoutExercise,
  IWorkoutSet,
  WorkoutExercises,
} from "../types/workouts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { WorkoutStoreType } from "../types/store";

//NOTE: Think about manually saving and writing to storage as currently it will do so on every state update
//which is really inefficient

const useWorkout = create<WorkoutStoreType>()(
  persist(
    (set) => ({
      workouts: [],
      activeWorkout: undefined,
      pending_workout_updates: [],
      createWorkout: (workout: IWorkout) =>
        set((state) => ({ workouts: [...state.workouts, workout] })),
      deleteWorkout: (workout_id: string) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== workout_id),
        })),
      startWorkout: (template?: IWorkout) =>
        set(produce((state: WorkoutStoreType) => {
          if (template) {
            state.activeWorkout = template;
            state.activeWorkout.id = uuid.v4().toString();
          } else {
            state.activeWorkout = {
              id: uuid.v4().toString(),
              name: "Unnamed workout",
              exercises: {},
              started_at: new Date(),
            };
          }
        })),
      cancelWorkout: () => set(() => ({ activeWorkout: undefined })),
      updateField: (field, value) =>
        set(produce((state: WorkoutStoreType) => {
          if (state.activeWorkout) {
            state.activeWorkout[field] = value;
          }
        })),
      addExercises: (newExercises) =>
        set(produce((state: WorkoutStoreType) => {
          // Create a WorkoutExercise object
          const workoutExercises: WorkoutExercises = newExercises.reduce(
            (a, e) => {
              const sets: IWorkoutSet[] = [{
                id: uuid.v4().toString(),
                type: "R",
                weight: 0,
                reps: 0,
                completed: false,
              }];
              const workoutExercise: IWorkoutExercise = { ...e, sets };
              return { ...a, [workoutExercise.id]: workoutExercise };
            },
            {},
          );
          // Merge existing exercises and new exercises prioritizing existing exercises
          // in case of overlap
          Object.keys(workoutExercises).forEach((key) => {
            if (!state.activeWorkout!.exercises[key]) {
              state.activeWorkout!.exercises[key] = workoutExercises[key];
            }
          });
        })),
      addSet: (exercise_id: string) =>
        //TODO: Add set from history
        set(produce((state: WorkoutStoreType) => {
          if (state.activeWorkout) {
            state.activeWorkout.exercises[exercise_id].sets.push({
              id: uuid.v4.toString(),
              type: "R",
              weight: 0,
              reps: 0,
              completed: false,
            });
          }
        })),
      removeSet: (exerciseId: string, setIndex: number) =>
        set(produce((state: WorkoutStoreType) => {
          if (state.activeWorkout) {
            // Remove set by index from array
            state.activeWorkout.exercises[exerciseId].sets.splice(setIndex, 1);
          }
        })),
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useWorkout };
