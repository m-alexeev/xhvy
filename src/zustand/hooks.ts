import { Workout } from "@app/types/workouts";
import { useWorkout } from "./workoutStore";
import { Template } from "@app/types/templates";

const getWorkout = (id: Workout["id"]) => {
  const workouts = useWorkout((state) => state.workouts);
  return workouts[id];
};

// TODO: UPdate with templates
const getTemplates = (): Template[] => {
  const workouts = useWorkout((state) => state.workouts);
  return workouts;
};

export { getTemplates, getWorkout };
