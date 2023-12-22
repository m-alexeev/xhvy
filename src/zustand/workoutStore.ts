import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IWorkout } from "../types/workouts";
import AsyncStorage from "@react-native-async-storage/async-storage";


type WorkoutState = {
  workouts: Array<IWorkout>;
  activeWorkout: IWorkout;
  pending_workout_updates: Array<IWorkout>;
};

type WorkoutAction = {
  createWorkout: (workout: IWorkout) => void;
  updateWorkout: (workout_id: string, workout: IWorkout) => void;
  deleteWorkout: (workout_id: string) => void;
}


const useWorkout = create<WorkoutState & WorkoutAction>()(
  persist(
    (set) => ({
      workouts: [],
      pending_workout_updates: [],

    }),
    {
      name: "workout-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
