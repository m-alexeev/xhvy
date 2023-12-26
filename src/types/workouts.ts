import { IExercise } from "./exercises";

type SetType = "R" | "W" | "D" | "F";

interface IWorkoutSet {
  type: SetType;
  reps: number;
  weight: number;
  bodyweight?: boolean;
  previous?: number,
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
}

export { IWorkout, IWorkoutExercise, IWorkoutSet, SetType };
