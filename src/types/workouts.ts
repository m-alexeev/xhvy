import { IExercise } from "./exercises";


type SetType = "R" | "W" | "D" | "F";

interface IWorkoutSet {
  type: SetType;
  reps: number;
  weight: number;
  completed: boolean;
  bodyweight?: boolean;
  previous?: number,
}

//NOTE: Probably change this to be a nested object instead, 
//1. Add the sets into the exercise object 
//2. Sets should be a {[key: string]: IWorkoutSet} object
interface IWorkoutExercise {
  exercise: IExercise;
  sets: Array<IWorkoutSet>;
}

//NOTE: Exercises should be an object {[id: string]: IWorkoutExercise}
// where the id is the id of the exercise to improve on 
// operations on a single exercise
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
