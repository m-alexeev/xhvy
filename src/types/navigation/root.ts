import { NavigationProp } from "@react-navigation/native";
import { Workout, WorkoutExercise } from "../workouts";

//==Root Stack===/
export type RootStackParamList = {
  HomeStack: undefined;
  AuthStack: undefined;
  WorkoutCreateModal: {
    workoutId?: Workout["id"];
    exercises?: Array<WorkoutExercise>;
  };
  WorkoutViewModal: { workoutId: string }; // Move to WorkoutStack
  WorkoutEditModal: { workoutId: string };
  AddExerciseModal: {
    selectedExercises?: Array<WorkoutExercise["id"]>;
    templateId?: string;
    workoutId?: string;
  };
};

// For useNavigation Hook
export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
