import { RootStackParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import HomeStackComponent from "./HomeStack";
import AuthStackRoutes from "./AuthStack";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";


const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackComponent: FC = ({}) => {
  // TODO: Check for user object and send to home / auth

  const theme = useTheme();
  const user = undefined;

  return (
    <>
    <StatusBar backgroundColor={theme.colors.surface}/>
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {user ? 
        <RootStack.Screen name="HomeStack" component={HomeStackComponent}/>
      :
        <RootStack.Screen name="AuthStack" component={AuthStackRoutes}/>
      }
      
    </RootStack.Navigator>
    </>
  );
};

export default RootStackComponent;
