import { StyleSheet } from "react-native";
import React, { FC, useState } from "react";
import { IWorkoutSet } from "../../types/workouts";
import { Text, useTheme } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import CustomTextInput from "../core/TextInput";
import IconButton from "../core/IconButton";

interface WorkoutSetProps {
  set: IWorkoutSet;
  setNum: number;
}

const WorkoutSet: FC<WorkoutSetProps> = ({ set, setNum }) => {
  const {colors} = useTheme();
  const [completed, setComplete] = useState<boolean>(set.completed);

  return (
    <Animated.View style={styles.tableRow} entering={FadeIn}>
      <Text style={[styles.tableColumn, styles.setCol]}>
        {set.type === "R" ? setNum : set.type}
      </Text>
      <Text style={[styles.tableColumn, styles.prevCol]}>
        {set.previous ? set.previous : "-"}
      </Text>
      <CustomTextInput
        containerStyle={[styles.tableColumn, styles.weightCol]}
        style={{ textAlign: "center" }}
        placeholder="0"
        inputMode="numeric"
      >
      </CustomTextInput>
      <CustomTextInput
        containerStyle={[styles.tableColumn, styles.repCol]}
        style={{ textAlign: "center" }}
        placeholder="0"
        inputMode="numeric"
      >
      </CustomTextInput>
      <IconButton
        style={[styles.tableColumn, styles.completeCol, {height:28}]}
        onPress={console.log}
        size={20}
        color={colors.onSurfaceVariant}
        icon={"check-bold"}
      >
      </IconButton>
    </Animated.View>
  );
};

export default WorkoutSet;

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    gap: 7,
    height: 30,
    alignItems: "center",
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
    width: 40,
  },
  repCol: {
    flex: 0,
    width: 40,
  },
  completeCol: {
    width: 20,
  },
});
