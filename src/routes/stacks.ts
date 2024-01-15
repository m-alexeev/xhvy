import { AuthStackParamList } from "@app/types/navigation/auth";
import {
  ExerciseDetailsTabParamList,
  ExerciseStackParamList,
} from "@app/types/navigation/exericse";
import { MainBottomTabParamList } from "@app/types/navigation/main";
import { RootStackParamList } from "@app/types/navigation/root";
import { TemplateStackParamList } from "@app/types/navigation/templates";
import { WorkoutStackParamList } from "@app/types/navigation/workout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const ExerciseTabs = createMaterialTopTabNavigator<
  ExerciseDetailsTabParamList
>();

export const ExercisedStack = createNativeStackNavigator<
  ExerciseStackParamList
>();

export const HomeStack = createBottomTabNavigator<MainBottomTabParamList>();

export const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();

export const TemplateStack = createNativeStackNavigator<
  TemplateStackParamList
>();
