import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { IWorkoutExercise } from "../../types/workouts";
import { camelCase } from "../../utils/stringParsers";
import WorkoutSetTable from "./WorkoutSetTable";

interface WorkoutExerciseItemProps {
  workoutExercise: IWorkoutExercise;
}

const WorkoutExerciseItem: FC<WorkoutExerciseItemProps> = (
  { workoutExercise },
) => {
  const { colors } = useTheme();
  const { exercise, sets } = workoutExercise;
  return (
    <View
      style={[styles.container, { backgroundColor: colors.surfaceVariant }]}
    >
      <Text variant="titleMedium">{camelCase(exercise.name)}</Text>
      <Text>Sets</Text>
      <View>
        <WorkoutSetTable sets={sets}/>
        <Button mode="text">Add Set</Button>
      </View>
    </View>
  );
};

export default WorkoutExerciseItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
  },
});
