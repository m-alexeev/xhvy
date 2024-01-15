import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import WorkoutHistoryList from "@app/pages/workout/WorkoutHistoryList";
import Header from "@app/components/core/Header";
import { WorkoutStack } from "./stacks";

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
