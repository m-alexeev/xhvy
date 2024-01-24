import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./root";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface MainTabParamList extends MainBottomTabParamList {}
  }
}
//==Home Stack===//
export type MainBottomTabParamList = {
  Home: undefined;
  Templates: undefined;
  Workout: undefined;
  Profile: undefined;
  Exercises: undefined;
};

// Template for home screen navigation props
// Combined with RootStack
export type MainTabsNavigationProp<T extends keyof MainBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
