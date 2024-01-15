import { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import { useThemeSwitch } from "@app/contexts/ThemeContext";
import AuthStackRoutes from "./AuthStack";
import HomeStackComponent from "./HomeStack";
import { ModalGroup } from "./ModalGroup";
import { RootStack } from "./stacks";


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
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
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
            headerShown: true,
          }}
        >
          {ModalGroup()}
        </RootStack.Group>
      </RootStack.Navigator>
    </>
  );
};

export default RootStackComponent;
