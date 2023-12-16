import { RootStackParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import HomeStackComponent from "./HomeStack";
import AuthStackRoutes from "./AuthStack";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import auth from "@react-native-firebase/auth"


const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackComponent: FC = ({}) => {
  // TODO: Check for user object and send to home / auth
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing){
      setInitializing(false);
    }
  }  
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []); 


  const theme = useTheme();

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
