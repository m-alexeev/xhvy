import { equipment, exerciseTypes, forces, majorMuclesGroups, movements, muscles, tags } from "../utils/categories";

export type Equipment = typeof equipment[number];
export type Force = typeof forces[number]; 
export type Movement = typeof movements[number]; 
export type ExerciseType = typeof exerciseTypes[number]; 
export type Muscle = typeof muscles[number];
export type MajorMuscleGroup = typeof majorMuclesGroups[number];
export type Tag = typeof tags[number];

export interface IExercise {
  id: string;
  name: string;
  instructions?: string;
  equipment?: Equipment;
  force?: Force;
  type?: ExerciseType;
  tags?: Array<Tag>;
  primaryMuscles?:Array<Muscle>;
  primaryMuscleGroups?:Array<MajorMuscleGroup>;
  secondaryMuscles?:Array<Muscle>;
  secondaryMuscleGroups?: Array<MajorMuscleGroup>;
  movement?: Movement;
  modifiable?: boolean; 
  user_id?: string;
}

