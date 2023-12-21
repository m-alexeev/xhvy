import HomeScreen from "../pages/home/Home";
import ProfileScreen from "../pages/home/Profile";
import WorkoutsScreen from "../pages/home/Workouts";
import { MainBottomTabParamList } from "../types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import ExerciseStackRouter from "./ExerciseStack";
import { Appbar, Icon, Surface } from "react-native-paper";

const HomeStack = createBottomTabNavigator<MainBottomTabParamList>();

const HomeStackComponent: FC = ({}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Exercises"
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: (props) => <Icon {...props} source="home" /> }}
      />
      <HomeStack.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{
          tabBarIcon: (props) => <Icon {...props} source="plus" />,
          headerShown: true,
          header: () => {
            return (
              <Surface elevation={4} style={{ flex: 1 }}>
                <Appbar.Header mode="small">
                  <Appbar.Content title="Workouts" />
                  <Appbar.Action
                    icon="dots-vertical"
                    onPress={() => console.log("options")}
                  />
                </Appbar.Header>
              </Surface>
            );
          },
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
  );
};

export default HomeStackComponent;
