import { Exercise } from "@app/types/exercises";

const getFilteredExercises = (exercises: Exercise[], search: string) => {
  const sortedExercises = exercises.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return sortedExercises.filter((exercise) => (
    exercise.name.toLowerCase().includes(search.trim().toLowerCase())
  ));
};

export { getFilteredExercises };
