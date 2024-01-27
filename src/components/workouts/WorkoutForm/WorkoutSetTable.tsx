import { View } from "react-native";
import React, { FC, memo, useCallback } from "react";
import { WorkoutSet, WorkoutSet as IWorkoutSet } from "@app/types/workouts";
import { Text, useTheme } from "react-native-paper";
import { tableStyles } from "./styles";
import SwipableWorkoutSetWrapper from "./SwipableWorkoutSetWrapper";
import { WorkoutAction } from "@app/types/store";
import { formatNumberField } from "@app/utils/stringParsers";
import CustomTextInput from "@app/components/core/TextInput";
import IconButton from "@app/components/core/IconButton";
import Animated, { FadeIn } from "react-native-reanimated";

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
  const theme = useTheme();
  const closeSwipable = (index: number) => {
    removeSet(exerciseId, index);
  };

  const update = <T extends keyof WorkoutSet>(
    field: T,
    value: WorkoutSet[T],
    index: number,
  ) => {
    updateSet(exerciseId, index, field, value, workoutId);
  };

  const RenderSet = useCallback(
    ({ item, index }: { item: IWorkoutSet; index: number }) => (
      <SwipableWorkoutSetWrapper
        onSwipeableOpen={() => closeSwipable(index)}
        key={item.id}
      >
        <Animated.View
          style={[
            tableStyles({ theme: theme }).tableRow,
            item.completed && tableStyles({ theme: theme }).completedStyle,
          ]}
          entering={FadeIn}
        >
          <Text style={[tableStyles({ width: 0.6 }).tableCol]}>
            {item.type === "R" ? index + 1 : item.type}
          </Text>
          <Text style={tableStyles({}).tableCol}>
            {item.previous ? item.previous : "-"}
          </Text>
          <CustomTextInput
            containerStyle={tableStyles({}).tableCol}
            style={{ textAlign: "center" }}
            placeholder="0"
            placeholderTextColor={theme.colors.outline}
            inputMode="numeric"
            onChangeText={(e) => update("weight", Number(e), index)}
            value={formatNumberField(item.weight)}
          >
          </CustomTextInput>
          <CustomTextInput
            containerStyle={tableStyles({}).tableCol}
            style={{ textAlign: "center" }}
            placeholder="0"
            placeholderTextColor={theme.colors.outline}
            inputMode="numeric"
            onChangeText={(e) => update("reps", Number(e), index)}
            value={formatNumberField(item.reps)}
          >
          </CustomTextInput>
          <IconButton
            style={[tableStyles({ width: 0.6 }).tableCol, {
              height: 28,
            }]}
            onPress={() => update("completed", !item.completed, index)}
            size={20}
            color={theme.colors.onSurfaceVariant}
            icon={"check-bold"}
            selected={item.completed}
          >
          </IconButton>
        </Animated.View>
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
        {sets.map((set, index) => (
          <RenderSet key={set.id} item={set} index={index} />
        ))}
      </View>
    </View>
  );
});

export default WorkoutSetTable;
