import { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import AuthStackRoutes from "./AuthStack";
import HomeStackComponent from "./HomeStack";
import { ModalGroup } from "./ModalGroup";
import { RootStack } from "./stacks";
import { useOptions } from "@app/zustand/optionsStore";

const RootStackComponent: FC = ({ }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const theme = useOptions((state) => state.theme);

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

  return (
    <>
      <StatusBar animated style={theme === "dark" ? "light" : "dark"} />
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
