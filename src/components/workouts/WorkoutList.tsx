import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { IWorkoutExercise } from "../../types/workouts";
import { useTheme } from "react-native-paper";
import WorkoutExerciseItem from "./WorkoutExerciseItem";

interface WorkoutListProps {
  exercises: IWorkoutExercise[];
}

const WorkoutList: FC<WorkoutListProps> = ({ exercises }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {exercises.map((e) => (
        <WorkoutExerciseItem key={e.exercise.id} workoutExercise={e} />
      ))}
    </View>
  );
};

export default WorkoutList;

const styles = StyleSheet.create({
  container: { flex: 1 },

  exerciseList: {},
});
