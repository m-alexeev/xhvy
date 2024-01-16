import { NavigationProp } from "@react-navigation/native";
import { Template } from "../templates";
import { Workout } from "../workouts";

type ActiveAddMode = {
  mode: "active";
};

type WorkoutAddMode = {
  mode: "workout";
  id: Workout["id"];
};

type TemplateAddMode = {
  mode: "template";
  id: Template["id"];
};

type AddExerciseModalParams = WorkoutAddMode | TemplateAddMode | ActiveAddMode;
//==Root Stack===/
export type RootStackParamList = {
  HomeStack: undefined;
  AuthStack: undefined;
  WorkoutCreateModal: undefined;
  WorkoutViewModal: { workoutId: string }; // Move to WorkoutStack
  WorkoutEditModal: { workoutId: string };
  AddExerciseModal: AddExerciseModalParams;
};

// For useNavigation Hook
export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
