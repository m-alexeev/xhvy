import { View } from "react-native";
import React, { FC } from "react";
import { IWorkoutSet } from "@app/types/workouts";
import { Text } from "react-native-paper";
import WorkoutSet from "./WorkoutSet";
import { tableStyles } from "./styles";
import SwipableWorkoutSetWrapper from "./SwipableWorkoutSetWrapper";
import { useWorkout } from "@app/zustand/workoutStore";

interface WorkoutSetTableProps {
  sets: IWorkoutSet[];
  exerciseId: string;
  workoutId?: string;
}

const WorkoutSetTable: FC<WorkoutSetTableProps> = (
  { sets, exerciseId, workoutId },
) => {
  const removeSet = useWorkout((state) => state.removeSet);
  const updateSet = useWorkout((state) => state.updateSet);

  const closeSwipable = (index: number) => {
    removeSet(exerciseId, index);
  };

  return (
    <View style={tableStyles({}).container}>
      <View style={tableStyles({}).headerRow}>
        <Text style={tableStyles({ width: 0.6 }).headerColumn}>
          Set
        </Text>
        <Text style={tableStyles({}).headerColumn}>
          Previous
        </Text>
        <Text style={tableStyles({}).headerColumn}>
          Weight
        </Text>
        <Text style={tableStyles({}).headerColumn}>
          Reps
        </Text>
        <View style={tableStyles({ width: 0.6 }).headerColumn}>
        </View>
      </View>
      {sets.map((set, index) => (
        <SwipableWorkoutSetWrapper
          onSwipeableOpen={() => closeSwipable(index)}
          key={set.id}
        >
          <WorkoutSet
            setNum={index + 1}
            set={set}
            updateField={(k, v) =>
              updateSet(exerciseId, index, k, v, workoutId)}
          />
        </SwipableWorkoutSetWrapper>
      ))}
    </View>
  );
};

export default WorkoutSetTable;
