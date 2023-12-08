import ExercisesScreen from "../pages/home/Exercises";
import HomeScreen from "../pages/home/Home";
import ProfileScreen from "../pages/home/Profile";
import WorkoutsScreen from "../pages/home/Workouts";
import { HomeStackParamList } from "../types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";

const HomeStack = createBottomTabNavigator<HomeStackParamList>();

const HomeStackComponent: FC = ({}) => {
  return(
    <HomeStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Exercises" >
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Workouts" component={WorkoutsScreen}/>
      <HomeStack.Screen name="Exercises" component={ExercisesScreen}/>
      <HomeStack.Screen name="Profile" component={ProfileScreen}/>
    </HomeStack.Navigator>
  )
}

export default HomeStackComponent;
