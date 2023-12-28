import { Animated as RNAnimated, StyleSheet, View } from "react-native";
import React, { FC, useRef, useState } from "react";
import { IWorkoutSet } from "../../types/workouts";
import { Icon, MD3Theme, Text, useTheme } from "react-native-paper";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CustomTextInput from "../core/TextInput";
import IconButton from "../core/IconButton";
import { Swipeable } from "react-native-gesture-handler";
import { useWorkout } from "../../zustand/workoutStore";

interface WorkoutSetProps {
  set: IWorkoutSet;
  setNum: number;
  exerciseId: string;
}

const AnimatedView = RNAnimated.createAnimatedComponent(View);

const WorkoutSet: FC<WorkoutSetProps> = ({ set, setNum, exerciseId }) => {
  const theme = useTheme();
  const { removeSet} = useWorkout();
  const [completed, setComplete] = useState<boolean>(set.completed);

  const renderDelete = (
    _progress: RNAnimated.AnimatedInterpolation<number>,
    dragX: RNAnimated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0,1],
      extrapolate: "clamp",
    });
    return (
      <View
        style={styles(theme).deleteContainer}
      >
        <AnimatedView
          style={[styles(theme).deleteView, {
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
    <Swipeable
      renderRightActions={renderDelete}
      rightThreshold={30}
      friction={2}
      onSwipeableOpen={closeSwipable}
    >
      <Animated.View
        style={[
          styles(theme).tableRow,
          completed && styles(theme).completedStyle,
        ]}
        entering={FadeIn}
      >
        <Text style={[styles(theme).tableColumn, styles(theme).setCol]}>
          {set.type === "R" ? setNum : set.type}
        </Text>
        <Text style={[styles(theme).tableColumn, styles(theme).prevCol]}>
          {set.previous ? set.previous : "-"}
        </Text>
        <CustomTextInput
          containerStyle={[styles(theme).tableColumn, styles(theme).inpytCol]}
          style={{ textAlign: "center" }}
          placeholder="0"
          inputMode="numeric"
        >
        </CustomTextInput>
        <CustomTextInput
          containerStyle={[styles(theme).tableColumn, styles(theme).inpytCol]}
          style={{ textAlign: "center" }}
          placeholder="0"
          inputMode="numeric"
        >
        </CustomTextInput>
        <IconButton
          style={[styles(theme).tableColumn, styles(theme).completeCol, {
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
  );
};

export default WorkoutSet;

const styles = (props: MD3Theme) =>
  StyleSheet.create({
    tableRow: {
      flexDirection: "row",
      gap: 7,
      height: 30,
      alignItems: "center",
      backgroundColor: props.colors.surfaceVariant,
    },
    tableColumn: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      flexGrow: 1,
    },
    headerRow: {
      opacity: 0.6,
    },
    setCol: {
      width: 20,
    },
    prevCol: {
      width: 80,
    },
    inpytCol: {
      flex: 0,
      width: 45,
    },
    completeCol: {
      width: 10,
    },
    completedStyle: {
      backgroundColor: props.colors.primaryContainer,
      borderRadius: 5,
    },
    deleteContainer: {
      flex: 1,
      justifyContent: "center",
    },
    deleteView: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: props.colors.error,
      borderRadius: 3,
      alignItems: "flex-end",
    },
  });
