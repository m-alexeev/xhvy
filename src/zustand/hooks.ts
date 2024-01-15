import { IWorkout } from "@app/types/workouts";
import { useWorkout } from "./workoutStore";

const getWorkout = (id: IWorkout["id"]) => {
  const workouts = useWorkout((state) => state.workouts);
  return workouts[id];
};

const getTemplates = (): IWorkout[] => {
  const workouts = useWorkout((state) => state.workouts);
  const templates = Object.values(workouts).filter((workout) =>
    workout.template
  );
  return templates;
};

export { getWorkout, getTemplates };
