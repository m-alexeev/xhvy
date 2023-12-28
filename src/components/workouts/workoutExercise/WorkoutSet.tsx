import { Animated as RNAnimated, StyleSheet, View } from "react-native";
import React, { FC, useState } from "react";
import { IWorkoutSet } from "../../../types/workouts";
import { Icon, MD3Theme, Text, useTheme } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import CustomTextInput from "../../core/TextInput";
import IconButton from "../../core/IconButton";
import { Swipeable } from "react-native-gesture-handler";
import { useWorkout } from "../../../zustand/workoutStore";
import { tableStyles } from "./styles";

interface WorkoutSetProps {
  set: IWorkoutSet;
  setNum: number;
  exerciseId: string;
}

const AnimatedView = RNAnimated.createAnimatedComponent(View);

const WorkoutSet: FC<WorkoutSetProps> = ({ set, setNum, exerciseId }) => {
  const theme = useTheme();
  const { removeSet } = useWorkout();
  const [completed, setComplete] = useState<boolean>(set.completed);

  const renderDelete = (
    _progress: RNAnimated.AnimatedInterpolation<number>,
    dragX: RNAnimated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View
        style={tableStyles({ theme: theme }).deleteContainer}
      >
        <AnimatedView
          style={[tableStyles({ theme: theme }).deleteView, {
            transform: [{ translateX: trans }],
          }]}
        >
          <Icon size={24} color={theme.colors.errorContainer} source={"delete"}>
          </Icon>
        </AnimatedView>
      </View>
    );
  };

  const closeSwipable = () => {
    removeSet(exerciseId, setNum - 1);
  };

  return (
    <View style={{ marginBottom:3}}>
      <Swipeable
        renderRightActions={renderDelete}
        rightThreshold={30}
        friction={2}
        onSwipeableOpen={closeSwipable}
      >
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
      </Swipeable>
    </View>
  );
};

export default WorkoutSet;
