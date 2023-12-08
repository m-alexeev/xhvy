import { RootStackParamList } from "@/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import HomeStackComponent from "./HomeStack";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackComponent: FC = ({}) => {
  return (
    <RootStack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="HomeStack" component={HomeStackComponent}>
      </RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default RootStackComponent;
