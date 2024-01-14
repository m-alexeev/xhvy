import { IExercise } from "./exercises";
import { IWorkout, IWorkoutSet } from "./workouts";

export type WorkoutState = {
  workouts: { [id: string]: IWorkout };
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
    workoutId?: string,
  ) => void;
  addExercises: (exercises: IExercise[]) => void;
  removeExercise: (exercise_id: string) => void;
  saveWorkout: () => void;
  addSet: (exercise_id: string) => void;
  removeSet: (exerciseId: string, setIndex: number) => void;
  updateSet: <T extends keyof IWorkoutSet, K extends IWorkoutSet[T]>(
    exerciseId: string,
    index: number,
    field: T,
    value: K,
    workoutId?: string,
  ) => void;
};

export type ExerciseState = {
  exercises: Array<IExercise>;
  pending_exercse_updates: Array<IExercise>;
};

export type ExerciseAction = {
  createExercise: (exercise: IExercise) => void;
  updateExercise: (exerciseId: string, exercise: IExercise) => void;
  deleteExercise: (exerciseId: string) => void;
};

export type WorkoutStoreType = WorkoutState & WorkoutAction;
export type ExerciseStoreType = ExerciseState & ExerciseAction;
