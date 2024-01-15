import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { MainBottomTabParamList } from "./main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./root";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TemplateStackParamList = {
  View: NavigatorScreenParams<MainBottomTabParamList>;
  Edit: { templateId: string };
  Create: undefined;
};

export type TemplateStackNavigationProp<
  T extends keyof TemplateStackParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<TemplateStackParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
