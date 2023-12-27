import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { IWorkoutExercise } from "../../types/workouts";
import { useTheme } from "react-native-paper";
import WorkoutExerciseItem from "./WorkoutExerciseItem";
import { ScrollView } from "react-native-gesture-handler";

interface WorkoutListProps {
  exercises: IWorkoutExercise[];
}

const WorkoutList: FC<WorkoutListProps> = ({ exercises }) => {
  const { colors } = useTheme();
  return (
    <ScrollView style={styles.container}>
      {exercises.map((e) => (
        <WorkoutExerciseItem key={e.exercise.id} workoutExercise={e} />
      ))}
    </ScrollView>
  );
};

export default WorkoutList;

const styles = StyleSheet.create({
  container: { flex: 1 },

  exerciseList: {},
});
