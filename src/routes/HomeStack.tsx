import { FC } from "react";
import { Icon } from "react-native-paper";
import WorkoutStackRouter from "./WorkoutStack";
import HomeScreen from "@app/pages/home/Home";
import ProfileScreen from "@app/pages/home/Profile";
import ExerciseStackRouter from "./ExerciseStack";
import { HomeStack } from "./stacks";
import TemplateStackRouter from "./TemplateStack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDumbbell,
  faFolder,
  faHome,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const HomeStackComponent: FC = ({}) => {
  return (
    <>
      <HomeStack.Navigator
        screenOptions={{ headerShown: false, tabBarLabelStyle: {fontFamily: "Poppins_400Regular"} }}
        initialRouteName="Exercises"
        
      >
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: (props) => (
              <FontAwesomeIcon {...props} icon={faHome} size={20} />
            ),
          }}
        />
        <HomeStack.Screen
          name="Templates"
          component={TemplateStackRouter}
          options={{
            tabBarIcon: (props) => (
              <FontAwesomeIcon {...props} icon={faFolder} size={20} />
            ),
          }}
        />
        <HomeStack.Screen
          name="Workout"
          component={WorkoutStackRouter}
          options={{
            tabBarIcon: (props) => (
              <FontAwesomeIcon {...props} icon={faPlus} size={20} />
            ),
          }}
        />
        <HomeStack.Screen
          name="Exercises"
          component={ExerciseStackRouter}
          options={{
            tabBarIcon: (props) => (
              <FontAwesomeIcon {...props} icon={faDumbbell} size={20} />
            ),
          }}
        />

        <HomeStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: (props) => (
              <FontAwesomeIcon {...props} icon={faUser} size={20} />
            ),
          }}
        />
      </HomeStack.Navigator>
    </>
  );
};

export default HomeStackComponent;
