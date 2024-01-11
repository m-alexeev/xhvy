import { create } from "zustand";
import { produce } from "immer";
import { persist } from "zustand/middleware";
import {
  IWorkout,
  IWorkoutExercise,
  IWorkoutSet,
  WorkoutExercises,
} from "../types/workouts";
import uuid from "react-native-uuid";
import { WorkoutStoreType } from "@app/types/store";
import { CustomStorage } from "./customStorage";

//NOTE: Think about manually saving and writing to storage as currently it will do so on every state update
//which is really inefficient

const useWorkout = create<WorkoutStoreType>()(
  persist(
    (set) => ({
      workouts: {},
      activeWorkout: undefined,
      pending_workout_updates: [],
      createWorkout: (workout: IWorkout) =>
        set(
          produce((state: WorkoutStoreType) => {
            state.workouts[workout.id] = workout;
          }),
        ),
      deleteWorkout: (workoutId: string) =>
        set(produce((state: WorkoutStoreType) => {
          if (state.workouts[workoutId]) {
            delete state.workouts[workoutId];
          }
        })),
      startWorkout: (template?: IWorkout) =>
        set(
          produce((state: WorkoutStoreType) => {
            state.activeWorkout = undefined;

            if (template) {
              const newWorkout: IWorkout = { ...template };
              newWorkout.started_at = new Date();
              newWorkout.id = uuid.v4().toString();
              state.activeWorkout = newWorkout;
            } else {
              state.activeWorkout = {
                id: uuid.v4().toString(),
                name: "Unnamed workout",
                exercises: {},
                started_at: new Date(),
              };
            }
          }),
        ),
      cancelWorkout: () => set(() => ({ activeWorkout: undefined })),
      updateField: (field, value, workoutId) =>
        set(
          produce((state: WorkoutStoreType) => {
            if (workoutId) {
              // Update created workouts
              const workout = state.workouts[workoutId];
              if (workout) {
                state.workouts[workoutId][field] = value;
              }
            } else if (state.activeWorkout) {
              // Update currently active workout
              state.activeWorkout[field] = value;
            }
          }),
        ),
      addExercises: (newExercises) =>
        set(
          produce((state: WorkoutStoreType) => {
            // Create a WorkoutExercise object
            const workoutExercises: WorkoutExercises = newExercises.reduce(
              (a, e) => {
                const sets: IWorkoutSet[] = [
                  {
                    id: uuid.v4().toString(),
                    type: "R",
                    weight: 0,
                    reps: 0,
                    completed: false,
                  },
                ];
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
          }),
        ),
      removeExercise: (exerciseId) =>
        set(
          produce((state: WorkoutStoreType) => {
            if (state.activeWorkout) {
              delete state.activeWorkout.exercises[exerciseId];
            }
          }),
        ),
      saveWorkout: () =>
        set(
          produce((state: WorkoutStoreType) => {
            if (state.activeWorkout) {
              // Save to workout array
              state.activeWorkout.completed_at = new Date();
              // Add to start of workout array
              state.workouts[state.activeWorkout.id] = state.activeWorkout;
              // Clear active workout
              state.activeWorkout = undefined;
            }
          }),
        ),
      addSet: (exercise_id: string) =>
        set(
          produce((state: WorkoutStoreType) => {
            if (state.activeWorkout) {
              state.activeWorkout.exercises[exercise_id].sets.push({
                id: uuid.v4().toString(),
                type: "R",
                weight: 0,
                reps: 0,
                completed: false,
              });
            }
          }),
        ),
      removeSet: (exerciseId: string, setIndex: number) =>
        set(
          produce((state: WorkoutStoreType) => {
            if (state.activeWorkout) {
              // Remove set by index from array
              state.activeWorkout.exercises[exerciseId].sets.splice(
                setIndex,
                1,
              );
            }
          }),
        ),
      updateSet: (exerciseId: string, index: number, field, value, workoutId) =>
        set(
          produce((state: WorkoutStoreType) => {
            if (workoutId) {
              // Update created workout sets
              const workout = state.workouts[workoutId];
              if (workout) {
                state.workouts[workoutId].exercises[exerciseId]
                  .sets[index][field] = value;
              }
            } else if (state.activeWorkout) {
              state.activeWorkout.exercises[exerciseId].sets[index][field] =
                value;
            }
          }),
        ),
    }),
    {
      name: "workout-storage",
      storage: CustomStorage<WorkoutStoreType>(),
    },
  ),
);

export { useWorkout };
