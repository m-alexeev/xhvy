import { View } from "react-native";
import React, { FC, memo, useCallback } from "react";
import {
  Workout,
  WorkoutSet,
  WorkoutSet as IWorkoutSet,
} from "@app/types/workouts";
import { Text, useTheme } from "react-native-paper";
import { tableStyles } from "./styles";
import SwipableWorkoutSetWrapper from "./SwipableWorkoutSetWrapper";
import { WorkoutAction } from "@app/types/store";
import { formatNumberField } from "@app/utils/stringParsers";
import CustomTextInput from "@app/components/core/TextInput";
import IconButton from "@app/components/core/IconButton";
import Animated, { FadeIn } from "react-native-reanimated";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Row from "@app/components/core/grid/Row";
import Col from "@app/components/core/grid/Col";

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
    removeSet(exerciseId, index, workoutId);
  };

  const update = <T extends keyof WorkoutSet>(
    field: T,
    value: WorkoutSet[T],
    index: number,
  ) => {
    updateSet(exerciseId, index, field, value, workoutId);
  };

  const completeSet = (
    item: IWorkoutSet,
    completed: boolean,
    index: number,
  ) => {
    if (item.reps === undefined || item.reps === 0) {
      // prevent from saving
    } else if (item.weight === undefined) {
      // if weight is not entered,
      // TODO: set it to 0 (set to previous weight in future)
      update("weight", 0, index);
    }

    if (item.reps !== undefined && item.reps > 0) {
      // mark as completed only if reps are added
      update("completed", completed, index);
    }
  };

  const RenderSet = useCallback(
    ({ item, index }: { item: IWorkoutSet; index: number }) => (
      <SwipableWorkoutSetWrapper
        onSwipeableOpen={() => closeSwipable(index)}
        key={item.id}
      >
        <Animated.View
          entering={FadeIn}
        >
          <Row
            style={[
              tableStyles({ theme: theme }).tableRow,
              item.completed && tableStyles({ theme: theme }).completedStyle,
            ]}
          >
            <Col span={1}>
              <Text style={{ textAlign: "center" }}>
                {item.type === "R" ? index + 1 : item.type}
              </Text>
            </Col>
            <Col span={2}>
              <Text style={{ textAlign: "center" }}>
                {item.previous ? item.previous : "-"}
              </Text>
            </Col>
            <Col span={2}>
              <CustomTextInput
                style={{ textAlign: "center" }}
                placeholder="0"
                placeholderTextColor={theme.colors.outline}
                inputMode="numeric"
                onChangeText={(e) => update("weight", Number(e), index)}
                value={formatNumberField(item.weight)}
              >
              </CustomTextInput>
            </Col>
            <Col span={2}>
              <CustomTextInput
                style={{ textAlign: "center" }}
                placeholder="0"
                placeholderTextColor={theme.colors.outline}
                inputMode="numeric"
                onChangeText={(e) => update("reps", Number(e), index)}
                value={formatNumberField(item.reps)}
              >
              </CustomTextInput>
            </Col>
            <Col span={1}>
              <IconButton
                style={tableStyles({}).tableCol}
                onPress={() => completeSet(item, !item.completed, index)}
                size={20}
                color={theme.colors.onSurfaceVariant}
                icon={faCheck}
                selected={item.completed}
              >
              </IconButton>
            </Col>
          </Row>
        </Animated.View>
      </SwipableWorkoutSetWrapper>
    ),
    [],
  );

  return (
    <View style={tableStyles({}).container}>
      <View style={{ flex: 8 }}>
        <Row>
          <Col span={1}>
            <Text style={{ textAlign: "center" }}>Set</Text>
          </Col>
          <Col span={2}>
            <Text style={{ textAlign: "center" }}>Previous</Text>
          </Col>
          <Col span={2}>
            <Text style={{ textAlign: "center" }}>Weight</Text>
          </Col>
          <Col span={2}>
            <Text style={{ textAlign: "center" }}>Reps</Text>
          </Col>
          <Col span={1}>
          </Col>
        </Row>
        {sets.map((set, index) => (
          <RenderSet key={set.id} item={set} index={index} />
        ))}
      </View>
    </View>
  );
});

export default WorkoutSetTable;
