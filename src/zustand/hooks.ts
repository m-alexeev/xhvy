import { Workout } from "@app/types/workouts";
import { useWorkout } from "./workoutStore";
import { Template } from "@app/types/templates";

const getWorkout = (id: Workout["id"]) => {
  const workouts = useWorkout((state) => state.workouts);
  return workouts[id];
};

const getTemplates = (filter: boolean = true): Template[] => {
  const templates = useWorkout((s) => s.templates);
  if (filter) {
    return Object.values(templates).filter((t) => !t.wip);
  } else {
    return Object.values(templates);
  }
};

const getOrCreateTemplate = (id: Template["id"]) => {
  const templates = useWorkout((s) => s.templates);
  if (templates[id]) {
    return templates[id];
  } else {
    const newTemplate: Template = {
      id: id,
      name: "",
      note: "",
      exercises: {},
      template: true,
    };
    return newTemplate;
  }
};

export { getOrCreateTemplate, getTemplates, getWorkout };
