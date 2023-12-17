export type Equipment =
  | "barbell"
  | "dumbbells"
  | "machine"
  | "cable"
  | "resistance band"
  | "trapbar"
  | "smith machine"
  | "sled"
  | "yoke"
  | "farmers handles"
  | "sandbag"
  | "body weight"
  | "misc";

export type Force = "push" | "pull" | "push and pull";
export type Movement = "dynamic" | "isometric";
export type ExerciseType = "compound" | "isolation";
export type Muscle =
  | "triceps"
  | "biceps"
  | "pronators"
  | "supinators"
  | "forearm flexors"
  | "forearm extensors"
  | "brachioradialis"
  | "quadriceps"
  | "hamstrings"
  | "calves"
  | "adductors"
  | "abductors"
  | "gluteal muscles"
  | "trapezius"
  | "erector spinae"
  | "latissimus dorsi"
  | "upper chest"
  | "lower chest"
  | "pectoralis minor"
  | "anterior deltoid"
  | "lateral deltoid"
  | "posterior deltoid"
  | "obliques"
  | "transverse abdominis"
  | "rectus abdominis";

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
  instructions: string;
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

