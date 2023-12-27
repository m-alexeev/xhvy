import { IExercise } from "./exercises";
import { IWorkout } from "./workouts";

export type WorkoutState = {
  workouts: Array<IWorkout>;
  activeWorkout?: IWorkout;
  pending_workout_updates: Array<IWorkout>;
};

export type WorkoutAction = {
  createWorkout: (workout: IWorkout) => void;
  // updateWorkout: (workout_id: string, workout: IWorkout) => void;
  deleteWorkout: (workout_id: string) => void;
  startWorkout: (template?: IWorkout) => void;
  cancelWorkout: () => void;
  updateField: <T extends keyof IWorkout, K extends IWorkout[T]>(
    field: T,
    value: K,
  ) => void;
  addExercises: (exercises: IExercise[]) => void;
  // removeExercise: (exercise_id: string) => void;
  addSet: (exercise_id: string) => void;
  removeSet: (exerciseId: string, setIndex: number) => void;
};

export type WorkoutStoreType = WorkoutState & WorkoutAction;
