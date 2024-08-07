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
import { Template } from "@app/types/templates";
import { Exercise } from "@app/types/exercises";

//NOTE: Think about manually saving and writing to storage as currently it will do so on every state update
//which is really inefficient

const useWorkout = create<WorkoutStoreType>()(
  persist(
    (set) => ({
      workouts: {},
      activeWorkout: undefined,
      pending_workout_updates: [],
      deleteWorkout: (id: string) =>
        set(produce((state: WorkoutStoreType) => {
          delete state.workouts[id];
        })),
      saveActiveWorkout: () =>
        set(
          produce((state: WorkoutStoreType) => {
            if (state.activeWorkout) {
              state.activeWorkout.completedAt = new Date();

              // Remove any 0 rep sets
              Object.values(state.activeWorkout.exercises).forEach(
                (exercise) => {
                  exercise.sets = exercise.sets.filter((set) =>
                    set.reps && set.reps > 0
                  );
                },
              );

              // Removes empty exercises from exercises object
              Object.keys(state.activeWorkout.exercises).forEach((id) => {
                if (state.activeWorkout?.exercises[id].sets.length === 0) {
                  delete state.activeWorkout.exercises[id];
                }
              });

              // Add to start of workout array
              state.workouts[state.activeWorkout.id] = state.activeWorkout;
              // Clear active workout
              state.activeWorkout = undefined;
            }
          }),
        ),
      startWorkout: (template?: Template) =>
        set(
          produce((state: WorkoutStoreType) => {
            // Reset active workout if one exists
            state.activeWorkout = undefined;
            // Create workout from the template or previous workout
            if (template) {
              const newWorkout: Workout = {
                ...template,
                startedAt: new Date(),
                id: uuid.v4().toString(),
              };
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
      addExercises: (newExercises: Exercise[], id, mode) =>
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
                const workoutExercise: WorkoutExercise = {
                  id: e.id,
                  name: e.name,
                  user_id: e.user_id,
                  modifiable: e.modifiable,
                  sets,
                };

                return { ...a, [workoutExercise.id]: workoutExercise };
              },
              {},
            );

            // Merge existing exercises and new exercises prioritizing existing exercises
            // in case of overlap
            Object.keys(workoutExercises).forEach((key) => {
              if (mode === "active") {
                if (!state.activeWorkout!.exercises[key]) {
                  state.activeWorkout!.exercises[key] = workoutExercises[key];
                }
              } else if (mode === "workout") {
                state.workouts[id!].exercises[key] = workoutExercises[key];
              }
            });
          }),
        ),
      removeExercise: (exerciseId: string, workoutId?: Workout["id"]) =>
        set(
          produce((state: WorkoutStoreType) => {
            if (workoutId) {
              delete state.workouts[workoutId].exercises[exerciseId];
            } // Remove exercise from active workout
            else if (state.activeWorkout) {
              delete state.activeWorkout.exercises[exerciseId];
            }
          }),
        ),
      addSet: (exercise_id: string, workoutId?: Workout["id"]) =>
        set(
          produce((state: WorkoutStoreType) => {
            // Add to active workout
            const newSet: WorkoutSet = {
              id: uuid.v4().toString(),
              type: "R",
              weight: 0,
              reps: 0,
              completed: false,
            };
            if (workoutId) {
              state.workouts[workoutId].exercises[exercise_id].sets.push(
                newSet,
              );
            } else if (state.activeWorkout) {
              state.activeWorkout.exercises[exercise_id].sets.push(newSet);
            }
          }),
        ),
      removeSet: (
        exerciseId: string,
        setIndex: number,
        workoutId?: Workout["id"],
      ) =>
        set(
          produce((state: WorkoutStoreType) => {
            if (workoutId) {
              state.workouts[workoutId].exercises[exerciseId].sets.splice(
                setIndex,
                1,
              );
            } else if (state.activeWorkout) {
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
