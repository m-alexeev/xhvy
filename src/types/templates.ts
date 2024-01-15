import { Workout } from "./workouts";

type Template = Omit<Workout, "started_at" | "completed_at"> & {
  template: boolean;
};

export { Template };
