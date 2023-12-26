import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { IWorkoutSet } from "../../types/workouts";

interface WorkoutSetProps {
  set: IWorkoutSet;
}

const WorkoutSet: FC<WorkoutSetProps> = ({ set }) => {
  return (
    <View>
      <Text>WorkoutSet</Text>
    </View>
  );
};

export default WorkoutSet;

const styles = StyleSheet.create({});
