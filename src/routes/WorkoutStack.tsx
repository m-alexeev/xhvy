import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import WorkoutView from "@app/pages/workout/WorkoutView";
import { WorkoutStackParamList } from "@app/types/navigation";
import { Header } from "react-native/Libraries/NewAppScreen";

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
