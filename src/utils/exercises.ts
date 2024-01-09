import { IExercise } from "@app/types/exercises";

const getFilteredExercises = (exercises: IExercise[], search: string) => {
  return exercises.filter((exercise) => (
    exercise.name.toLowerCase().includes(search.trim().toLowerCase())
  ))
}


export {getFilteredExercises}
