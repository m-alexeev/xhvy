import { Exercise } from "./exercises";
import { AddMode } from "./general";
import { Template, Templates} from "./templates";
import { Workout, Workouts, WorkoutSet } from "./workouts";

export type WorkoutState = {
  workouts: Workouts;
  activeWorkout?: Workout;
  pending_workout_updates: Array<Workout>;
};

export type TemplateState = {
  templates: Templates;
}

export type WorkoutAction = {
  createTemplate: (templateId: Template["id"], mode?: "new" | "copy") => void;
  saveTemplate: (template: Template) => void;
  // updateWorkout: (workout_id: string, workout: IWorkout) => void;
  deleteWorkout: (id: string, template?: boolean) => void;
  startWorkout: (template?: Workout) => void;
  cancelWorkout: () => void;
  updateField: <
    T extends keyof Workout,
    K extends Workout[T],
  >(
    field: T,
    value: K,
    workoutId?: string,
  ) => void;
  addExercises: (
    exercises: Exercise[],
    id?: Workout["id"],
    mode?: AddMode,
  ) => void;
  removeExercise: (exercise_id: string, workoutId?: Workout["id"]) => void;
  saveActiveWorkout: () => void;
  addSet: (exercise_id: string, workoutId?: Workout["id"]) => void;
  removeSet: (
    exerciseId: string,
    setIndex: number,
    workoutId?: Workout["id"],
  ) => void;
  updateSet: <T extends keyof WorkoutSet, K extends WorkoutSet[T]>(
    exerciseId: string,
    index: number,
    field: T,
    value: K,
    workoutId?: string,
  ) => void;
};

export type TemplateAction = {
  createTemplate: (templateId: Template["id"], mode?: "new" | "copy") => void;
  saveTemplate: (template: Template) => void;
}

export type ExerciseState = {
  exercises: Array<Exercise>;
  pending_exercse_updates: Array<Exercise>;
};

export type ExerciseAction = {
  createExercise: (exercise: Exercise) => void;
  updateExercise: (exerciseId: string, exercise: Exercise) => void;
  deleteExercise: (exerciseId: string) => void;
};

export type OptionsState = {
  theme: "dark" | "light";
  units: "imperial" | "metric";
};

export type OptionsActions = {
  updateOption: <T extends keyof OptionsState>(
    option: T,
    value: OptionsState[T],
  ) => void;
};

export type OptionsStoreType = OptionsState & OptionsActions;
export type WorkoutStoreType = WorkoutState & WorkoutAction;
export type TemplateStoreType = TemplatesState & TemplateAction;
export type ExerciseStoreType = ExerciseState & ExerciseAction;
