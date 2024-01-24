import { MainBottomTabParamList } from "./main";

declare global {
  namespace ReactNavigation {
    interface MainParamList extends MainBottomTabParamList{}
  }
}
