import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { IWorkoutSet } from "../../types/workouts";
import { Text, useTheme } from "react-native-paper";
import WorkoutSet from "./WorkoutSet";

interface WorkoutSetTableProps {
  sets: IWorkoutSet[];
}
const WorkoutSetTable: FC<WorkoutSetTableProps> = ({ sets }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.tableRow, styles.headerRow]}>
        <Text style={[styles.tableColumn, styles.setCol]}>
          Set
        </Text>
        <Text style={[styles.tableColumn, styles.prevCol]}>
          Previous
        </Text>
        <Text style={[styles.tableColumn, styles.weightCol]}>
          Weight
        </Text>
        <Text style={[styles.tableColumn, styles.repCol]}>
          Reps
        </Text>
        <View style={[styles.tableColumn, styles.completeCol]}>
        </View>
      </View>
      <View>
        {sets.map((set, index) => (
          <WorkoutSet key={index} setNum={index + 1} set={set}></WorkoutSet>
        ))}
      </View>
    </View>
  );
};

export default WorkoutSetTable;

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
    width: 45,
  },
  repCol: {
    width: 45,
  },
  completeCol: {
    width: 10,
    margin: 0,
  },
});
