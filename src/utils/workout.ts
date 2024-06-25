import { WorkoutExercises } from "@app/types/workouts";

const incompleteExercises = (exercises?: WorkoutExercises) => {
  if (!exercises){
    // Prevent from exiting since workout is empty
    return true;
  }
  // Check how many exercises are not completed and return true if array has any values
  const incomplete = Object.values(exercises).filter((exercise) => {
    const sets = exercise.sets.filter((set) => {
      return !set.completed;
    });
    return sets.length > 0;
  });

  return incomplete.length !== 0;
};


export {incompleteExercises}
