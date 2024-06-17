import { ChartWorkouts } from "@app/types/charts";
import { Workout, Workouts } from "@app/types/workouts";

interface FieldMapper<T> {
  (field: T): string;
}

export const DateMapper: FieldMapper<Date> = (field) => {
  return field.toLocaleString("default", { month: "long" });
};

export const FirstLetterMapper: FieldMapper<string> = (field) => {
  return field.charAt(0).toLocaleUpperCase();
};

export const NameMapper: FieldMapper<string> = (field) => {
  return field;
};

export const getMonday = (d: Date) => {
  let day = d.getDay()
  if (day !== 1) { // Only manipulate the date if it isn't Mon.
    return new Date(d.setHours(-24 * (day - 1))); // Set the hours to day number minus 1
  } else {
    return d;
  }
};

export const createWeeklyList = (workouts: Workout[]): ChartWorkouts => {
  // Works for year grouping, add weekly grouping
  const groupedWorkouts = workouts.reduce(
    (grouped: ChartWorkouts, workout) => {
      const weekStart = getMonday(workout.startedAt).toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          "month": "numeric",
        },
      );
      if (!(weekStart in grouped)) {
        grouped[weekStart] = [];
      }
      grouped[weekStart].push(workout);
      return grouped;
    },
    {},
  );
  
  return groupedWorkouts;
};

export const createSectionList = <T, K extends keyof T>(
  data: Array<T>,
  sectionField: K,
  mapping: FieldMapper<T[K]>,
): Array<{ title: string; data: Array<T> }> => {
  type SectionDictType = Record<string, Array<T>>;
  type SectionListType = Array<{ title: string; data: Array<T> }>;
  // Create list of sections
  const sectionDict: SectionDictType = data.reduce(
    (accum: SectionDictType, curr: T) => {
      const field = curr[sectionField];
      const mappedField = mapping(field);
      if (!accum[mappedField]) {
        accum[mappedField] = [curr];
      } else {
        accum[mappedField].push(curr);
      }
      return accum;
    },
    {},
  );

  const sectionList: SectionListType = Object.keys(sectionDict).map((key) => {
    return {
      title: key,
      data: sectionDict[key],
    };
  });

  return sectionList;
};

export const formatTime = (time: number): string => {
  return new Date(time * 1000).toISOString().slice(11, 19);
};

export const calculateDuration = (start: Date, end: Date): string => {
  const difference = (end.getTime() - start.getTime()) / 1000;
  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  //TODO: decide if seconds are needed
  const seconds = Math.floor(difference % 60);
  return `${hours}:${minutes.toLocaleString().padStart(2, "0")}`;
};
