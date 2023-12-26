import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import React, { FC } from "react";
import { IWorkoutSet } from "../../types/workouts";
import { IconButton, Text, useTheme } from "react-native-paper";


interface SetInputFieldProps extends TextInputProps {
}
const SetInputField: FC<SetInputFieldProps> = ({ ...props }) => {
  const { colors } = useTheme();
  return (
    <TextInput
      cursorColor={colors.primary}
      placeholder="0"
      placeholderTextColor={colors.onSurfaceVariant}
      style={[props.style, inputStyles.field, {
        backgroundColor: colors.backdrop,
        color: colors.onBackground,
      }]}
      keyboardType="numeric"
    >
    </TextInput>
  );
};

const inputStyles = StyleSheet.create({
  field: {
    borderRadius: 5,
  },
});

interface WorkoutSetProps {
  set: IWorkoutSet;
  setNum: number
}

const WorkoutSet: FC<WorkoutSetProps> = ({ set, setNum }) => {
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableColumn, styles.setCol]}>
        {set.type === "R" ? setNum : set.type}
      </Text>
      <Text style={[styles.tableColumn, styles.prevCol]}>
        {set.previous ? set.previous : "-"}
      </Text>
      <SetInputField style={[styles.tableColumn, styles.weightCol]}>
        {set.weight}
      </SetInputField>
      <SetInputField style={[styles.tableColumn, styles.repCol]}>
        {set.reps}
      </SetInputField>
      <IconButton
        style={[styles.tableColumn, styles.completeCol]}
        onPress={console.log}
        size={16}
        icon={"check-bold"}
      >
      </IconButton>
    </View>
  );
};

export default WorkoutSet;

const styles = StyleSheet.create({
  container: {},
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
    width: 40,
  },
  repCol: {
    width: 40,
  },
  completeCol: {
    width: 20,
    margin: 0,
  },
});
