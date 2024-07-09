import {
  HistoricExercise,
  Workout,
  WorkoutExercise,
} from "@app/types/workouts";
import { useWorkout } from "./workoutStore";
import { Template } from "@app/types/templates";
import { Exercise } from "@app/types/exercises";
import { useExercise } from "./exerciseStore";
import { useTemplate } from "./templateStore";

const getExerciseById = (id: Exercise["id"]): Exercise | undefined => {
  const exercises = useExercise((s) => s.exercises);
  return exercises.find((e) => e.id === id);
};

const getExerciseHistory = (id: WorkoutExercise["id"]): HistoricExercise[] => {
  const workouts = useWorkout((s) => s.workouts);

  // Extract exercises
  const workoutsContainingExercise = Object.values(workouts).filter((workout) =>
    Object.keys(workout.exercises).includes(id)
  );
  const exerciseHistory: HistoricExercise[] = [];
  workoutsContainingExercise.forEach((workout) => {
    exerciseHistory.push({
      ...workout.exercises[id],
      completedAt: workout.completedAt!,
    });
  });

  // Sort by date in descending order
  exerciseHistory.sort((a, b) => {
    return b.completedAt.getTime() - a.completedAt.getTime();
  });

  return exerciseHistory;
};

const getWorkout = (id: Workout["id"]) => {
  const workouts = useWorkout((state) => state.workouts);
  return workouts[id];
};

const getTemplates = (filter: boolean = true): Template[] => {
  const templates = useTemplate((s) => s.templates);
  if (filter) {
    return Object.values(templates).filter((t) => !t.wip);
  } else {
    return Object.values(templates);
  }
};

const getOrCreateTemplate = (id: Template["id"]) => {
  const templates = useTemplate((s) => s.templates);
  if (templates[id]) {
    return templates[id];
  } else {
    const newTemplate: Template = {
      id: id,
      name: "New Template",
      note: "",
      exercises: {},
      template: true,
    };
    return newTemplate;
  }
};

export {
  getExerciseById,
  getExerciseHistory,
  getOrCreateTemplate,
  getTemplates,
  getWorkout,
};
