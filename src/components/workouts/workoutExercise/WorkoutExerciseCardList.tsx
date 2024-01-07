import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import WorkoutExerciseCard from "./WorkoutExerciseCard";
import { WorkoutExercises } from "@app/types/workouts";

interface WorkoutListProps {
  exercises: WorkoutExercises;
  workoutId?: string;
}

const WorkoutExerciseCardList: FC<WorkoutListProps> = (
  { exercises, workoutId },
) => {
  return (
    <View style={styles.container}>
      {Object.entries(exercises).map(([key, exercise]) => (
        <WorkoutExerciseCard
          key={key}
          workoutExercise={exercise}
          workoutId={workoutId}
        />
      ))}
    </View>
  );
};

export default WorkoutExerciseCardList;

const styles = StyleSheet.create({
  container: { flex: 1 },

  exerciseList: {},
});
