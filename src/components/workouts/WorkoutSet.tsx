import { StyleSheet } from "react-native";
import React, { FC, useState } from "react";
import { IWorkoutSet } from "../../types/workouts";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import CustomTextInput from "../core/TextInput";
import IconButton from "../core/IconButton";

interface WorkoutSetProps {
  set: IWorkoutSet;
  setNum: number;
}

const WorkoutSet: FC<WorkoutSetProps> = ({ set, setNum }) => {
  const theme = useTheme();
  const [completed, setComplete] = useState<boolean>(set.completed);

  return (
    <Animated.View style={[styles(theme).tableRow, completed && styles(theme).completedStyle]} entering={FadeIn}>
      <Text style={[styles(theme).tableColumn, styles(theme).setCol]}>
        {set.type === "R" ? setNum : set.type}
      </Text>
      <Text style={[styles(theme).tableColumn, styles(theme).prevCol]}>
        {set.previous ? set.previous : "-"}
      </Text>
      <CustomTextInput
        containerStyle={[styles(theme).tableColumn, styles(theme).weightCol]}
        style={{ textAlign: "center" }}
        placeholder="0"
        inputMode="numeric"
      >
      </CustomTextInput>
      <CustomTextInput
        containerStyle={[styles(theme).tableColumn, styles(theme).repCol]}
        style={{ textAlign: "center" }}
        placeholder="0"
        inputMode="numeric"
      >
      </CustomTextInput>
      <IconButton
        style={[styles(theme).tableColumn, styles(theme).completeCol, {height:28}]}
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

const styles = (props: MD3Theme) => StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    gap: 7,
    height: 30,
    alignItems: "center",
    marginBottom: 2,
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
  weightCol: {
    flex: 0,
    width: 45,
  },
  repCol: {
    flex: 0,
    width: 45,
  },
  completeCol: {
    width: 10,
  },
  completedStyle: {
    backgroundColor: props.colors.primaryContainer,
    borderRadius: 5,
    
  }
});
