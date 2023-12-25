import HomeScreen from "../pages/home/Home";
import ProfileScreen from "../pages/home/Profile";
import { MainBottomTabParamList } from "../types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC, useEffect } from "react";
import ExerciseStackRouter from "./ExerciseStack";
import { Icon } from "react-native-paper";
import WorkoutStackRouter from "./WorkoutStack";
import Templates from "../pages/home/Templates";
import { useWorkout } from "../zustand/workoutStore";

const HomeStack = createBottomTabNavigator<MainBottomTabParamList>();

const HomeStackComponent: FC = ({}) => {
  const tickTimer = useWorkout((state) => state.tickTimer);
  // Tick exercise timer 
  useEffect(() => {
    const interval = setInterval(tickTimer, 1000);
    return () => {
      clearInterval(interval);
    }
  }, 

   []);


  return (
    <>
      <HomeStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Workout"
      >
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: (props) => <Icon {...props} source="home" /> }}
        />
        <HomeStack.Screen
          name="Templates"
          component={Templates}
          options={{
            tabBarIcon: (props) => <Icon {...props} source="folder" />,
          }}
        />
        <HomeStack.Screen
          name="Workout"
          component={WorkoutStackRouter}
          options={{
            tabBarIcon: (props) => <Icon {...props} source="plus" />,
          }}
        />
        <HomeStack.Screen
          name="Exercises"
          component={ExerciseStackRouter}
          options={{
            tabBarIcon: (props) => <Icon {...props} source="dumbbell" />,
          }}
        />

        <HomeStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: (props) => <Icon {...props} source="account" />,
          }}
        />
      </HomeStack.Navigator>
    </>
  );
};

export default HomeStackComponent;
