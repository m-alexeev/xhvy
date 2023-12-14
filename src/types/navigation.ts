import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  HomeStack: undefined;
  AuthStack: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
}


export type MainBottomTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Profile: undefined;
  Exercises: undefined;
};

export type ExerciseStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  Details: { exercise_id: string };
  Create: undefined;
};

export type ExerciseDetailsTabParamList = {
  About: undefined;
  History: undefined;
  Charts: undefined;
  Records: undefined;
};
