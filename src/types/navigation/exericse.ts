import {
  CompositeScreenProps,
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { MainBottomTabParamList } from "./main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./root";

//==Exericse Stack===//
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
