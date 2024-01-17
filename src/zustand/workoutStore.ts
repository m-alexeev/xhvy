import { create } from "zustand";
import { produce } from "immer";
import { persist } from "zustand/middleware";
import {
  Workout,
  WorkoutExercise,
  WorkoutExercises,
  WorkoutSet,
} from "../types/workouts";
import uuid from "react-native-uuid";
import { WorkoutStoreType } from "@app/types/store";
import { CustomStorage } from "./customStorage";
import { Template, WorkoutOrTemplate } from "@app/types/templates";

//NOTE: Think about manually saving and writing to storage as currently it will do so on every state update
//which is really inefficient

const useWorkout = create<WorkoutStoreType>()(
  persist(
    (set) => ({
      workouts: {},
      templates: {},
      activeWorkout: undefined,
      pending_workout_updates: [],
      createTemplate: (template: Template) =>
        set(
          produce((state: WorkoutStoreType) => {
            state.templates[template.id] = template;
          }),
        ),
      deleteWorkout: (id: string, template?: boolean) =>
        set(produce((state: WorkoutStoreType) => {
          if (template) {
            delete state.templates[id];
          } else {
            delete state.workouts[id];
          }
        })),
      saveActiveWorkout: () =>
        set(
          produce((state: WorkoutStoreType) => {
            if (state.activeWorkout) {
              // Save to workout array
              state.activeWorkout.completedAt = new Date();
              // Add to start of workout array
              state.workouts[state.activeWorkout.id] = state.activeWorkout;
              // Clear active workout
              state.activeWorkout = undefined;
            }
          }),
        ),
      startWorkout: (base?: WorkoutOrTemplate) =>
        set(
          produce((state: WorkoutStoreType) => {
            // Reset active workout if one exists
            state.activeWorkout = undefined;
            // Create workout from the template or previous workout
            if (base) {
              //FIX: Fix this typing issue, check type of base first
              const newWorkout: Workout = { ...base };
              newWorkout.startedAt = new Date();
              newWorkout.id = uuid.v4().toString();
              state.activeWorkout = newWorkout;
            } else {
              // Create empty workout
              state.activeWorkout = {
                id: uuid.v4().toString(),
                name: "Unnamed workout",
                exercises: {},
                startedAt: new Date(),
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
      addExercises: (newExercises, id, mode) =>
        set(
          produce((state: WorkoutStoreType) => {
            // Add exercises to active workout
            // Create a WorkoutExercise object
            const workoutExercises: WorkoutExercises = newExercises.reduce(
              (a, e) => {
                const sets: WorkoutSet[] = [
                  {
                    id: uuid.v4().toString(),
                    type: "R",
                    weight: 0,
                    reps: 0,
                    completed: false,
                  },
                ];
                const workoutExercise: WorkoutExercise = { ...e, sets };
                return { ...a, [workoutExercise.id]: workoutExercise };
              },
              {},
            );
            // Merge existing exercises and new exercises prioritizing existing exercises
            // in case of overlap
            // TODO: Refactor this as code is repeating
            Object.keys(workoutExercises).forEach((key) => {
              if (mode === "active") {
                if (!state.activeWorkout!.exercises[key]) {
                  state.activeWorkout!.exercises[key] = workoutExercises[key];
                }
              } else if (mode === "workout") {
                state.workouts[id!].exercises[key] = workoutExercises[key];
              } else if (mode === "template") {
                state.templates[id!].exercises[key] = workoutExercises[key];
              }
            });
          }),
        ),
      removeExercise: (exerciseId: string) =>
        set(
          produce((state: WorkoutStoreType) => {
            // Remove exercise from active workout
            if (state.activeWorkout) {
              delete state.activeWorkout.exercises[exerciseId];
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
