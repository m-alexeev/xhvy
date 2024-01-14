import { View } from "react-native";
import React, { FC, memo, useCallback } from "react";
import { IWorkoutSet } from "@app/types/workouts";
import { Text } from "react-native-paper";
import WorkoutSet from "./WorkoutSet";
import { tableStyles } from "./styles";
import SwipableWorkoutSetWrapper from "./SwipableWorkoutSetWrapper";
import { WorkoutAction } from "@app/types/store";
import { FlashList } from "@shopify/flash-list";

interface WorkoutSetTableProps {
  sets: IWorkoutSet[];
  exerciseId: string;
  workoutId?: string;
  removeSet: WorkoutAction["removeSet"];
  updateSet: WorkoutAction["updateSet"];
}

const WorkoutSetTable: FC<WorkoutSetTableProps> = memo((
  { sets, exerciseId, workoutId, removeSet, updateSet },
) => {
  const closeSwipable = (index: number) => {
    removeSet(exerciseId, index);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: IWorkoutSet; index: number }) => (
      <SwipableWorkoutSetWrapper
        onSwipeableOpen={() => closeSwipable(index)}
        key={item.id}
      >
        <WorkoutSet
          setNum={index + 1}
          set={item}
          updateField={(k, v) => updateSet(exerciseId, index, k, v, workoutId)}
        />
      </SwipableWorkoutSetWrapper>
    ),
    [],
  );

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
      <View style={{ minHeight: 20 }}>
        <FlashList
          estimatedItemSize={20}
          scrollEnabled={false}
          data={sets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
});

export default WorkoutSetTable;
