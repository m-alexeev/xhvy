import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { IWorkoutExercise } from "../../types/workouts";
import { camelCase } from "../../utils/stringParsers";
import WorkoutSetTable from "./WorkoutSetTable";
import { useWorkout } from "../../zustand/workoutStore";
import Animated from "react-native-reanimated";

interface WorkoutExerciseItemProps {
  workoutExercise: IWorkoutExercise;
}

const WorkoutExerciseItem: FC<WorkoutExerciseItemProps> = (
  { workoutExercise },
) => {
  const { addSet } = useWorkout();
  const { colors } = useTheme();
  const { exercise, sets } = workoutExercise;
  return (
    <View
      style={[styles.container, { backgroundColor: colors.surfaceVariant }]}
    >
      <Text variant="titleMedium">{camelCase(exercise.name)}</Text>
      <View>
        <WorkoutSetTable sets={sets} />
        <Animated.View>
          <Button mode="text" onPress={() => addSet(exercise.id)}>
            Add Set
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};

export default WorkoutExerciseItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 10,
  },
});
