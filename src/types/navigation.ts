import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeStack: undefined;
  AuthStack: undefined;
  WorkoutCreateModal: undefined;
  WorkoutViewModal: { workoutId: string };
  WorkoutEditModal: { workoutId: string };
  AddExericiseModal: undefined;
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainBottomTabParamList = {
  Home: undefined;
  Templates: undefined;
  Workout: undefined;
  Profile: undefined;
  Exercises: undefined;
};

export type WorkoutStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  New: undefined;
  Edit: { workout_id: string };
};

export type WorkoutStackNavigationProp<T extends keyof WorkoutStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<WorkoutStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ExerciseStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  Details: { exercise_id: string };
  Create: undefined;
  Edit: { exercise_id: string };
};

export type ExerciseStackScreenProps<T extends keyof ExerciseStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ExerciseStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ExerciseDetailsTabParamList = {
  About: undefined;
  History: undefined;
  Charts: undefined;
  Records: undefined;
};

export type ExerciseDetailsTabProps = NavigationProp<ExerciseStackParamList>;
//TODO: Create a template type for composite screen props
