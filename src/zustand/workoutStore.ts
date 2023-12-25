import { create } from "zustand";
import { produce } from "immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { IWorkout } from "../types/workouts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

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
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useWorkout };
