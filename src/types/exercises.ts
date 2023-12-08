type MuscleGroupType =
  | "Chest"
  | "Back"
  | "Legs"
  | "Arms"
  | "Shoulders"
  | "Abs"
  | "Other";

type EquipmentType =
  | "Dumbbells"
  | "Barbell"
  | "Kettlebell"
  | "Resistance bands"
  | "Medicine ball"
  | "Weight machine"
  | "Bodyweight"
  | "Other";

interface IExercise {
  id: number;
  name: string;
  muscleGroup: MuscleGroupType;
  equipment: EquipmentType;
  description?: string;
}

export { EquipmentType, IExercise, MuscleGroupType };
