import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { MainBottomTabParamList } from "./main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./root";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WorkoutExercises } from "../workouts";

export type TemplateStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  Create: { templateId: string, exercises?: WorkoutExercises };
};

export type TemplateStackNavigationProp<
  T extends keyof TemplateStackParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<TemplateStackParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type TemplateNavProp = NavigationProp<TemplateStackParamList>;
