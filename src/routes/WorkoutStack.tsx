import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkoutStackParamList } from "../types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import Header from "../components/core/Header";
import WorkoutView from "../components/workouts/WorkoutView";

const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutStackRouter: FC = () => {
  const navigation = useNavigation<NavigationProp<WorkoutStackParamList>>();
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

const styles = StyleSheet.create({});

export default WorkoutStackRouter;
