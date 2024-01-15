import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import WorkoutHistoryList from "@app/pages/workout/WorkoutHistoryList";
import Header from "@app/components/core/Header";
import { WorkoutStackParamList } from "@app/types/navigation/workout";

const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutStackRouter: FC = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen
        component={WorkoutHistoryList}
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
