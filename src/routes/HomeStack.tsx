import HomeScreen from "../pages/home/Home";
import ProfileScreen from "../pages/home/Profile";
import WorkoutsScreen from "../pages/home/Workouts";
import { MainBottomTabParamList} from "../types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import ExerciseStackRouter from "./ExerciseStack";

const HomeStack = createBottomTabNavigator<MainBottomTabParamList>();

const HomeStackComponent: FC = ({}) => {
  return(
    <HomeStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Profile" >
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Workouts" component={WorkoutsScreen}/>
      <HomeStack.Screen name="Exercises" component={ExerciseStackRouter}/>
      <HomeStack.Screen name="Profile" component={ProfileScreen}/>
    </HomeStack.Navigator>
  )
}

export default HomeStackComponent;
