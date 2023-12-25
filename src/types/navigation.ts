import { NavigationProp, NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  HomeStack: undefined;
  AuthStack: undefined;
  Modal: undefined;
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
  Edit: {workout_id: string};
};
export type WorkoutStackNavigationProp = NavigationProp<WorkoutStackParamList>;

export type ExerciseStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  Details: { exercise_id: string };
  Create: undefined;
  Edit: {exercise_id: string};
};

export type ExerciseDetailsTabParamList = {
  About: undefined;
  History: undefined;
  Charts: undefined;
  Records: undefined;
};

//TODO: Create a template type for composite screen props 

