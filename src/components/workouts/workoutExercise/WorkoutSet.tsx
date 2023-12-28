import React, { FC } from "react";
import { Text, useTheme } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import CustomTextInput from "@app/components/core/TextInput";
import IconButton from "@app/components/core/IconButton";
import { IWorkoutSet } from "@app/types/workouts";
import { tableStyles } from "./styles";
import { formatNumberField } from "@app/utils/stringParsers";

interface WorkoutSetProps {
  set: IWorkoutSet;
  setNum: number;
  updateField: <T extends keyof IWorkoutSet, K extends IWorkoutSet[T]>(
    field: T,
    value: K,
  ) => void;
}

const WorkoutSet: FC<WorkoutSetProps> = ({ set, setNum, updateField }) => {
  const theme = useTheme();

  return (
    <Animated.View
      style={[
        tableStyles({ theme: theme }).tableRow,
        set.completed && tableStyles({ theme: theme }).completedStyle,
      ]}
      entering={FadeIn}
    >
      <Text style={[tableStyles({ width: 0.6 }).tableCol]}>
        {set.type === "R" ? setNum : set.type}
      </Text>
      <Text style={tableStyles({}).tableCol}>
        {set.previous ? set.previous : "-"}
      </Text>
      <CustomTextInput
        containerStyle={tableStyles({}).tableCol}
        style={{ textAlign: "center" }}
        placeholder="0"
        placeholderTextColor={theme.colors.outline}
        inputMode="numeric"
        onChangeText={(e) => updateField("weight", Number(e))}
        value={formatNumberField(set.weight)}
      >
      </CustomTextInput>
      <CustomTextInput
        containerStyle={tableStyles({}).tableCol}
        style={{ textAlign: "center" }}
        placeholder="0"
        placeholderTextColor={theme.colors.outline}
        inputMode="numeric"
        onChangeText={(e) => updateField("reps", Number(e))}
        value={formatNumberField(set.reps)}
      >
      </CustomTextInput>
      <IconButton
        style={[tableStyles({ width: 0.6 }).tableCol, {
          height: 28,
        }]}
        onPress={() => updateField("completed", !set.completed)}
        size={20}
        color={theme.colors.onSurfaceVariant}
        icon={"check-bold"}
        selected={set.completed}
      >
      </IconButton>
    </Animated.View>
  );
};

export default WorkoutSet;
