import { create } from "zustand";
import { produce } from "immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { IWorkout, IWorkoutExercise, IWorkoutSet } from "../types/workouts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { IExercise } from "../types/exercises";
import { merge } from "../utils/helpers";

type WorkoutState = {
  workouts: Array<IWorkout>;
  activeWorkout?: IWorkout;
  pending_workout_updates: Array<IWorkout>;
};

type WorkoutAction = {
  createWorkout: (workout: IWorkout) => void;
  // updateWorkout: (workout_id: string, workout: IWorkout) => void;
  deleteWorkout: (workout_id: string) => void;
  startWorkout: (template?: IWorkout) => void;
  cancelWorkout: () => void;
  updateField: <T extends keyof IWorkout, K extends IWorkout[T]>(
    field: T,
    value: K,
  ) => void;
  addExercises: (exercises: IExercise[]) => void;
  // removeExercise: (exercise_id: string) => void;
  addSet: (exercise_id: string) => void;
  removeSet: (exerciseId: string, setIndex: number) => void;
};

type WorkoutStoreType = WorkoutState & WorkoutAction;

//TODO: Think about manually saving and writing to storage as currently it will do so on every state update
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
              exercises: [],
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
      addExercises: (exercises) =>
        set(produce((state: WorkoutStoreType) => {
          const workoutExercises: IWorkoutExercise[] = exercises.map((e) => ({
            exercise: e,
            sets: [{ type: "R", weight: 0, reps: 0, completed: false }],
          }));
          if (state.activeWorkout) {
            state.activeWorkout.exercises = merge(
              state.activeWorkout.exercises,
              workoutExercises,
            );
          }
        })),
      addSet: (exercise_id: string) =>
        set(produce((state: WorkoutStoreType) => {
          if (state.activeWorkout) {
            state.activeWorkout.exercises.find((e) =>
              e.exercise.id === exercise_id
            )?.sets.push({ type: "R", weight: 0, reps: 0, completed: false });
          }
        })),
      removeSet: (exerciseId: string, setIndex: number) =>
        //FIX: Refactor this garbage 
        set(produce((state: WorkoutStoreType) => {
          if (state.activeWorkout) {
            const sets = state.activeWorkout.exercises.find((e) =>
              e.exercise.id === exerciseId
            )?.sets.filter(
              (_, index) => index !== setIndex,
            );
            state.activeWorkout.exercises.find((e) =>
              e.exercise.id === exerciseId
            )!.sets = sets as IWorkoutSet[];
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
