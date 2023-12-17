export type Equipment =
  | "barbell"
  | "dumbbells"
  | "machine"
  | "cable"
  | "resistanceband"
  | "trapbar"
  | "smithmachine"
  | "sled"
  | "yoke"
  | "farmershandles"
  | "sandbag"
  | "bodyweight"
  | "misc";

export type Force = "push" | "pull" | "push and pull";
export type Movement = "dynamic" | "isometric";
export type ExerciseType = "compound" | "isolation";
export type Muscle =
  | "triceps"
  | "biceps"
  | "pronators"
  | "supinators"
  | "forearmflexors"
  | "forearmextensors"
  | "brachioradialis"
  | "quadriceps"
  | "hamstrings"
  | "calves"
  | "adductors"
  | "abductors"
  | "glutealmuscles"
  | "trapezius"
  | "erectorspinae"
  | "latissimusdorsi"
  | "upperchest"
  | "lowerchest"
  | "pectoralisminor"
  | "anteriordeltoid"
  | "lateraldeltoid"
  | "posteriordeltoid"
  | "obliques"
  | "transverseabdominis"
  | "rectusabdominis";

export type MajorMuscleGroup =
  | "back"
  | "chest"
  | "shoulders"
  | "arms"
  | "legs"
  | "core";

export type Tag =
  | "powerlifting"
  | "olympic"
  | "strongman"
  | "calisthenics"
  | "plyometric";

export interface IExercise {
  id: string;
  name: string;
  instrcutions: string;
  equipment: Equipment;
  force: Force;
  type: ExerciseType;
  tags: Array<Tag>;
  primaryMuscles:Array<Muscle>;
  primaryMuscleGroups:Array<MajorMuscleGroup>;
  secondaryMuscles:Array<Muscle>;
  secondaryMuscleGroups: Array<MajorMuscleGroup>;
  movement: Movement;
}

