import { Workout } from "./workouts";

type Template = Omit<Workout, "started_at" | "completed_at"> & {
  template: boolean;
};

type Templates = { [id: Template["id"]]: Template };

type WorkoutOrTemplate = Template | Workout;

const isTemplate = (object: WorkoutOrTemplate): object is Template => {
  return "template" in object;
};

export { isTemplate, Template, Templates, WorkoutOrTemplate };
