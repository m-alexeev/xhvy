import { IExercise } from "./exercises";

export type SetType = "R" | "W" | "D" | "F";

interface IWorkoutSet {
  id: string;
  type: SetType;
  reps: number;
  weight: number;
  completed: boolean;
  bodyweight?: boolean;
  previous?: number;
}

export type WorkoutExercises = { [id: IExercise["id"]]: IWorkoutExercise };
interface IWorkoutExercise extends IExercise {
  sets: IWorkoutSet[];
}

interface IWorkout {
  id: string;
  name: string;
  exercises: WorkoutExercises;
  note?: string;
  template?: boolean;
  started_at: Date;
  completed_at?: Date;
}

export { IWorkout, IWorkoutExercise, IWorkoutSet};
