import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkoutStackParamList } from "../types/navigation";
import { Appbar } from "react-native-paper";
import Header from "../components/core/Header";
import WorkoutView from "../pages/workout/WorkoutView";

const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutStackRouter: FC = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen
        component={WorkoutView}
        name="View"
        options={{
          headerShown: true,
          header: () => {
            return (
              <Header title="Workouts">
                <Appbar.Action
                  icon="dots-vertical"
                  onPress={() => console.log("option")}
                />
              </Header>
            );
          },
        }}
      />
    </WorkoutStack.Navigator>
  );
};

export default WorkoutStackRouter;
