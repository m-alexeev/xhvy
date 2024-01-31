import { StyleSheet, View } from "react-native";
import React, { FC, memo, useEffect } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { WorkoutExercise } from "@app/types/workouts";
import { camelCase } from "@app/utils/stringParsers";
import WorkoutSetTable from "./WorkoutSetTable";
import IconButton from "@app/components/core/IconButton";
import { useWorkout } from "@app/zustand/workoutStore";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

interface WorkoutExerciseItemProps {
  workoutExercise: WorkoutExercise;
  workoutId?: string;
}

// Card for workout exercises
const WorkoutExerciseCard: FC<WorkoutExerciseItemProps> = memo(
  ({ workoutExercise, workoutId }) => {
    const { colors } = useTheme();
    const { name, id, sets } = workoutExercise;
    const addSet = useWorkout((s) => s.addSet);
    const removeSet = useWorkout((s) => s.removeSet);
    const removeExercise = useWorkout((s) => s.removeExercise);
    const updateSet = useWorkout((s) => s.updateSet);

    useEffect(() => {
      if (sets.length == 0) {
        removeExercise(id, workoutId);
      }
    }, [sets]);

    return (
      <View
        style={[styles.container, { backgroundColor: colors.surfaceVariant }]}
      >
        <View>
          <View style={styles.titleBar}>
            <Text variant="titleMedium">{camelCase(name)}</Text>
            <IconButton size={20} icon={faEllipsisV} onPress={console.log} />
          </View>
          {/*Render exercise table*/}
          <WorkoutSetTable
            sets={sets}
            exerciseId={id}
            workoutId={workoutId}
            removeSet={removeSet}
            updateSet={updateSet}
          />
          {/*Add sets to the table*/}
          <Button mode="text" onPress={() => addSet(id, workoutId)}>
            Add Set
          </Button>
        </View>
      </View>
    );
  },
);

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
