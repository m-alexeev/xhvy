import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import WorkoutCompleteButton from "@app/components/workouts/buttons/WorkoutCompleteButton";
import {
  RootStackNavigationProp,
  RootStackParamList,
} from "@app/types/navigation";
import { useThemeSwitch } from "@app/contexts/ThemeContext";
import AddExericse from "@app/pages/workout/AddExericse";
import WorkoutCreate from "@app/pages/workout/WorkoutCreate";
import AuthStackRoutes from "./AuthStack";
import HomeStackComponent from "./HomeStack";
import Header from "@app/components/core/Header";
import GoBackButton from "@app/components/core/buttons/GoBackButton";
import ViewWorkoutModal from "@app/pages/workout/ViewWorkout";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackComponent: FC = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
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
          <RootStack.Screen
            name="WorkoutCreateModal"
            component={WorkoutCreate}
            options={{
              header: () => (
                <Header
                  backButton={<GoBackButton size={32} />}
                >
                  <WorkoutCompleteButton />
                </Header>
              ),
            }}
          />
          <RootStack.Screen
            name="WorkoutViewModal"
            component={ViewWorkoutModal}
            options={{
              header: () => (
                <Header
                  title="View Workout"
                  backButton={<GoBackButton size={32} />}
                >
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
                >
                </Header>
              ),
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </>
  );
};

export default RootStackComponent;
