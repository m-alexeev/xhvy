import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { IWorkoutExercise } from "../../types/workouts";
import { Text, useTheme } from "react-native-paper";

interface WorkoutListProps {
  exercises: IWorkoutExercise[];
}

const WorkoutList: FC<WorkoutListProps> = ({ exercises }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text>WorkoutList</Text>
    </View>
  );
};

export default WorkoutList;

const styles = StyleSheet.create({
  container: { flex: 1 },
  exerciseList: {},
});
