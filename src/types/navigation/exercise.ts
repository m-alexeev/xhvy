import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { MainBottomTabParamList } from "./main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./root";
import { Exercise } from "../exercises";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

//==Exericse Stack===//
export type ExerciseStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  Details: { exerciseId: Exercise["id"] };
  Create: undefined;
  Edit: { exercise_id: string };
};

export type ExerciseStackScreenProps<T extends keyof ExerciseStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ExerciseStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ExerciseDetailsTabParamList = {
  About: { exercise: Exercise };
  History: { exercise: Exercise };
  Charts: { exercise: Exercise };
  Records: { exercise: Exercise };
};

export type ExerciseTabsScreenProps<
  T extends keyof ExerciseDetailsTabParamList,
> = MaterialTopTabScreenProps<ExerciseDetailsTabParamList, T>;

export type ExerciseDetailsTabProps = NavigationProp<ExerciseStackParamList>;
