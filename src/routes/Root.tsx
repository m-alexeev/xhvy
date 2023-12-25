import { RootStackParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import HomeStackComponent from "./HomeStack";
import AuthStackRoutes from "./AuthStack";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import { useThemeSwitch } from "../contexts/ThemeContext";
import WorkoutCreate from "../pages/workout/WorkoutCreate";
import AddExericse from "../pages/workout/AddExericse";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackComponent: FC = ({}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const { isThemeDark } = useThemeSwitch();

  return (
    <>
      <StatusBar animated style={isThemeDark ? "light" : "dark"} />
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Group>
          {user
            ? (
              <RootStack.Screen
                name="HomeStack"
                component={HomeStackComponent}
              />
            )
            : <RootStack.Screen name="AuthStack" component={AuthStackRoutes} />}
        </RootStack.Group>
        <RootStack.Group
          screenOptions={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        >
          <RootStack.Screen name="Modal" component={WorkoutCreate} />
          <RootStack.Screen name="AddExericiseModal" component={AddExericse}/>
        </RootStack.Group>
      </RootStack.Navigator>
    </>
  );
};

export default RootStackComponent;
