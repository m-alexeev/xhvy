import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import IconButton from "@app/components/core/IconButton";
import WorkoutCompleteButton from "@app/components/workouts/buttons/WorkoutCompleteButton";
import { RootStackParamList } from "@app/types/navigation";
import { useThemeSwitch } from "@app/contexts/ThemeContext";
import AddExericse from "@app/pages/workout/AddExericse";
import WorkoutCreate from "@app/pages/workout/WorkoutCreate";
import AuthStackRoutes from "./AuthStack";
import HomeStackComponent from "./HomeStack";
import Header from "@app/components/core/Header";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackComponent: FC = ({}) => {
  const navigation = useNavigation();
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
          {user ? (
            <RootStack.Screen name="HomeStack" component={HomeStackComponent} />
          ) : (
            <RootStack.Screen name="AuthStack" component={AuthStackRoutes} />
          )}
        </RootStack.Group>
        <RootStack.Group
          screenOptions={{
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: true,
          }}
        >
          <RootStack.Screen
            name="WorkoutModal"
            component={WorkoutCreate}
            options={{
              headerShown: true,
              header: () => (
                <Header
                  backButton={
                    <IconButton
                      size={24}
                      icon="chevron-down"
                      onPress={() => navigation.goBack()}
                    />
                  }
                >
                  <WorkoutCompleteButton />
                </Header>
              ),
            }}
          />
          <RootStack.Screen
            name="AddExericiseModal"
            component={AddExericse}
            options={{
              header: () => (
                <Header
                  title="Add Exercise"
                  backButton={
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                  }
                ></Header>
              ),
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </>
  );
};

export default RootStackComponent;
