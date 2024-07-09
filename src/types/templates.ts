import { Workout } from "./workouts";

type Template = Omit<Workout, "startedAt" | "completedAt"> & {
  template: boolean;
  wip?: boolean;
};

type Templates = { [id: Template["id"]]: Template };



export { Template, Templates};
