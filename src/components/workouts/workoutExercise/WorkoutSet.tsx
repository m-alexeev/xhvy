import { Animated as RNAnimated, View } from "react-native";
import React, { FC, useState } from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import CustomTextInput from "@app/components/core/TextInput";
import IconButton from "@app/components/core/IconButton";
import { IWorkoutSet } from "@app/types/workouts";
import { Swipeable } from "react-native-gesture-handler";
import { useWorkout } from "@app/zustand/workoutStore";
import { tableStyles } from "./styles";

interface WorkoutSetProps {
  set: IWorkoutSet;
  setNum: number;
  exerciseId: string;
}

const WorkoutSet: FC<WorkoutSetProps> = ({ set, setNum, exerciseId }) => {
  const theme = useTheme();
  const { removeSet } = useWorkout();
  const [completed, setComplete] = useState<boolean>(set.completed);

  return (
    <Animated.View
      style={[
        tableStyles({ theme: theme }).tableRow,
        completed && tableStyles({ theme: theme }).completedStyle,
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
        inputMode="numeric"
      >
      </CustomTextInput>
      <CustomTextInput
        containerStyle={tableStyles({}).tableCol}
        style={{ textAlign: "center" }}
        placeholder="0"
        inputMode="numeric"
      >
      </CustomTextInput>
      <IconButton
        style={[tableStyles({ width: 0.6 }).tableCol, {
          height: 28,
        }]}
        onPress={() => setComplete(!completed)}
        size={20}
        color={theme.colors.onSurfaceVariant}
        icon={"check-bold"}
        selected={completed}
      >
      </IconButton>
    </Animated.View>
  );
};

export default WorkoutSet;
