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

const getTemplateById = (id: Template["id"]) => {
  const templates = useWorkout((s) => s.templates);
  return templates[id];
};

export { getTemplates, getTemplateById, getWorkout };
