import { StyleSheet, View } from "react-native";
import React, { FC, useEffect } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { IWorkoutExercise } from "@app/types/workouts";
import { camelCase } from "@app/utils/stringParsers";
import WorkoutSetTable from "./WorkoutSetTable";
import { useWorkout } from "@app/zustand/workoutStore";
import IconButton from "@app/components/core/IconButton";

interface WorkoutExerciseItemProps {
  workoutExercise: IWorkoutExercise;
  workoutId?: string;
}

// Card for workout exercises
const WorkoutExerciseCard: FC<WorkoutExerciseItemProps> = (
  { workoutExercise, workoutId },
) => {
  const addSet = useWorkout((state) => state.addSet);
  const removeExercise = useWorkout((state) => state.removeExercise);
  const { colors } = useTheme();
  const { name, id, sets } = workoutExercise;

  // Remove exercise once all sets are removed
  useEffect(() => {
    if (sets.length == 0) {
      removeExercise(id);
    }
  }, [sets]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surfaceVariant }]}
    >
      <View>
        <View style={styles.titleBar}>
          <Text variant="titleMedium">{camelCase(name)}</Text>
          <IconButton size={20} icon="dots-vertical" onPress={console.log} />
        </View>
        {/*Render exercise table*/}
        <WorkoutSetTable sets={sets} exerciseId={id} workoutId={workoutId} />
        {/*Add sets to the table*/}
        <Button mode="text" onPress={() => addSet(id)}>
          Add Set
        </Button>
      </View>
    </View>
  );
};

export default WorkoutExerciseCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 10,
  },
  titleBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});
