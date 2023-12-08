import { IExercise } from "./exercises";

type SetType = "Working" | "Warmup" | "Drop" | "Failure";

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
  exercises: Array<IWorkoutExercise>;
  template?: boolean;
}

export { IWorkout, IWorkoutExercise, IWorkoutSet, SetType };
