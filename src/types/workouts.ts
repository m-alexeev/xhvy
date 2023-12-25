import { IExercise } from "./exercises";

type SetType = "R" | "W" | "D" | "F";

interface IWorkoutSet {
  type: SetType;
  reps: number;
  weight: number;
  bodyweight?: boolean;
}

interface IWorkoutExercise {
  exercise: IExercise;
  sets: Array<IWorkoutSet>;
}

interface IWorkout {
  id: string;
  name: string;
  exercises: Array<IWorkoutExercise>;
  note?: string;
  template?: boolean;
  started_at: Date;
  completed_at?: Date;
  duration: string;
}

export { IWorkout, IWorkoutExercise, IWorkoutSet, SetType };
