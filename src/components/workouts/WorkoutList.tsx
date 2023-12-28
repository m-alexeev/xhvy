import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { WorkoutExercises } from "../../types/workouts";
import { useTheme } from "react-native-paper";
import WorkoutExerciseItem from "./WorkoutExerciseItem";

interface WorkoutListProps {
  exercises: WorkoutExercises;
}

const WorkoutList: FC<WorkoutListProps> = ({ exercises }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {Object.entries(exercises).map(([key, exercise]) => (
        <WorkoutExerciseItem key={key} workoutExercise={exercise} />
      ))}
    </View>
  );
};

export default WorkoutList;

const styles = StyleSheet.create({
  container: { flex: 1 },

  exerciseList: {},
});
