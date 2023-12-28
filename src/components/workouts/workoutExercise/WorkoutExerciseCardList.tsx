import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import WorkoutExerciseCard from "./WorkoutExerciseCard";
import { WorkoutExercises } from "@app/types/workouts";

interface WorkoutListProps {
  exercises: WorkoutExercises;
}

const WorkoutExerciseCardList: FC<WorkoutListProps> = ({ exercises }) => {
  return (
    <View style={styles.container}>
      {Object.entries(exercises).map(([key, exercise]) => (
        <WorkoutExerciseCard key={key} workoutExercise={exercise} />
      ))}
    </View>
  );
};

export default WorkoutExerciseCardList;

const styles = StyleSheet.create({
  container: { flex: 1 },

  exerciseList: {},
});
