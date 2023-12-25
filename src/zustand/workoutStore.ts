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
  updateName: (name: string) => void;
  tickTimer: () => void;
};

type WorkoutStoreType = WorkoutState & WorkoutAction;

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
              duration: 0,
            };
          }
        })),
      cancelWorkout: () => set(() => ({ activeWorkout: undefined })),
      updateName: (name) =>
        set(produce((state: WorkoutStoreType) => {
          if (state.activeWorkout) {
            state.activeWorkout.name = name;
          }
        })),
      tickTimer: () => set(produce((state: WorkoutStoreType) => {
        if (state.activeWorkout){
          state.activeWorkout.duration += 1;
        }
      }))
    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useWorkout };
