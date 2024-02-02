import { Equipment, Exercise, MajorMuscleGroup } from "@app/types/exercises";
import { filter, intersection } from "lodash";

const getFilteredExercises = (
  exercises: Exercise[],
  search: string,
  filterCategories: (MajorMuscleGroup | Equipment)[],
) => {
  // filter by names
  const nameFilter = exercises.filter((exercise) => (
    exercise.name.toLowerCase().includes(search.trim().toLowerCase())
  ));

  if (filterCategories.length > 0) {
    // filter by categories

    const categoryFilter = nameFilter.filter((exercise) => {
      if (
        intersection(exercise.primaryMuscleGroups, filterCategories).length > 0
      ) {
        return true;
      } else if (
        intersection(exercise.secondaryMuscles, filterCategories).length > 0
      ) {
        return true;
      } else if (
        intersection([exercise.equipment], filterCategories).length > 0
      ) {
        return true;
      }
      return false;
    });

    return categoryFilter.sort((a, b) => a.name.localeCompare(b.name));
  }

  return nameFilter.sort((a, b) => a.name.localeCompare(b.name));
};

export { getFilteredExercises };
