import HomeScreen from "../pages/home/Home";
import ProfileScreen from "../pages/home/Profile";
import WorkoutsScreen from "../pages/home/Workouts";
import { MainBottomTabParamList } from "../types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC, useState } from "react";
import ExerciseStackRouter from "./ExerciseStack";
import { Appbar, Divider, Surface } from "react-native-paper";
import { Searchbar } from "react-native-paper";

const HomeStack = createBottomTabNavigator<MainBottomTabParamList>();

const HomeStackComponent: FC = ({ }) => {

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile" >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Workouts" component={WorkoutsScreen} options={{
        headerShown: true,
        header: (props) => {
          return (
            <Surface elevation={4} style={{ flex: 1 }}>
              <Appbar.Header mode="small">
                <Appbar.Content title="Workouts" />
                <Appbar.Action icon="dots-vertical" onPress={() => console.log('options')} />
              </Appbar.Header>
            </Surface>
          )
        }
      }} />
      <HomeStack.Screen name="Exercises" component={ExerciseStackRouter} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackComponent;
