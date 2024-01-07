import { IWorkout } from "@app/types/workouts";
import { useWorkout } from "./workoutStore";

const getWorkout = (id: IWorkout["id"]) => {
  const workouts = useWorkout((state) => state.workouts);
  return workouts[id];
};

export { getWorkout };
