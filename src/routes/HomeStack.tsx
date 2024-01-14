import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { Icon } from "react-native-paper";
import WorkoutStackRouter from "./WorkoutStack";
import HomeScreen from "@app/pages/home/Home";
import ProfileScreen from "@app/pages/home/Profile";
import { MainBottomTabParamList } from "@app/types/navigation";
import ExerciseStackRouter from "./ExerciseStack";
import TemplateHomePage from "@app/pages/templates/TemplateView";
import Header from "@app/components/core/Header";

const HomeStack = createBottomTabNavigator<MainBottomTabParamList>();

const HomeStackComponent: FC = ({}) => {
  return (
    <>
      <HomeStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Templates"
      >
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: (props) => <Icon {...props} source="home" /> }}
        />
        <HomeStack.Screen
          name="Templates"
          component={TemplateHomePage}
          options={{
            headerShown: true,
            header: () => {
              return <Header title="Templates" />;
            },
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
