import { Exercise } from "./exercises";
import { Template } from "./templates";

export type SetType = "R" | "W" | "D" | "F";

interface WorkoutSet {
  id: string;
  type: SetType;
  reps: number | undefined;
  weight: number | undefined;
  completed: boolean;
  bodyweight?: boolean;
  previous?: number;
}

type WorkoutExercises = { [id: Exercise["id"]]: WorkoutExercise };

interface WorkoutExercise extends Exercise {
  sets: WorkoutSet[];
}

interface Workout {
  id: string;
  name: string;
  exercises: WorkoutExercises;
  note?: string;
  startedAt: Date;
  completedAt?: Date;
}

type Workouts = { [id: Workout["id"]]: Workout };

export {
  Workout,
  WorkoutExercise,
  WorkoutExercises,
  Workouts,
  WorkoutSet,
};
