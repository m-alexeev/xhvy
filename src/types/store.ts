import { Exercise } from "./exercises";
import { Workout, WorkoutSet } from "./workouts";

export type WorkoutState = {
  workouts: { [id: string]: Workout };
  activeWorkout?: Workout;
  pending_workout_updates: Array<Workout>;
};

export type WorkoutAction = {
  createWorkout: (workout: Workout) => void;
  // updateWorkout: (workout_id: string, workout: IWorkout) => void;
  deleteWorkout: (workout_id: string) => void;
  startWorkout: (template?: Workout) => void;
  cancelWorkout: () => void;
  updateField: <T extends keyof Workout, K extends Workout[T]>(
    field: T,
    value: K,
    workoutId?: string,
  ) => void;
  addExercises: (exercises: Exercise[]) => void;
  removeExercise: (exercise_id: string) => void;
  saveWorkout: () => void;
  addSet: (exercise_id: string) => void;
  removeSet: (exerciseId: string, setIndex: number) => void;
  updateSet: <T extends keyof WorkoutSet, K extends WorkoutSet[T]>(
    exerciseId: string,
    index: number,
    field: T,
    value: K,
    workoutId?: string,
  ) => void;
};

export type ExerciseState = {
  exercises: Array<Exercise>;
  pending_exercse_updates: Array<Exercise>;
};

export type ExerciseAction = {
  createExercise: (exercise: Exercise) => void;
  updateExercise: (exerciseId: string, exercise: Exercise) => void;
  deleteExercise: (exerciseId: string) => void;
};

export type WorkoutStoreType = WorkoutState & WorkoutAction;
export type ExerciseStoreType = ExerciseState & ExerciseAction;
