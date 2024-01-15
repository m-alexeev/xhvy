import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { MainBottomTabParamList } from "./main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./root";

//==Workout Stack===//
export type WorkoutStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  Edit: { workout_id: string };
};

//TODO: Edit this type  
export type WorkoutStackNavigationProp<T extends keyof WorkoutStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<WorkoutStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
