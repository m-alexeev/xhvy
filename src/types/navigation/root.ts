import { NavigationProp } from "@react-navigation/native";

//==Root Stack===/
export type RootStackParamList = {
  HomeStack: undefined;
  AuthStack: undefined;
  WorkoutCreateModal: undefined;
  WorkoutViewModal: { workoutId: string }; // Move to WorkoutStack
  WorkoutEditModal: { workoutId: string };
  AddExerciseModal: undefined;
};

// For useNavigation Hook
export type RootStackNavigationProp = NavigationProp<RootStackParamList>;


