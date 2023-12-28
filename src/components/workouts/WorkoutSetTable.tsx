import { StyleSheet, View } from "react-native";
import React, { FC, useEffect } from "react";
import { IWorkoutSet } from "../../types/workouts";
import { Text, useTheme } from "react-native-paper";
import WorkoutSet from "./WorkoutSet";
import { useWorkout } from "../../zustand/workoutStore";

interface WorkoutSetTableProps {
  sets: IWorkoutSet[];
  exerciseId: string;
}

const WorkoutSetTableHeader: FC = () => {
  return (
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
  );
};

const WorkoutSetTable: FC<WorkoutSetTableProps> = ({ sets, exerciseId }) => {
  const { colors } = useTheme();
  
  const { removeExercise } = useWorkout();
  useEffect(() => {
    if (sets.length == 0) {
      removeExercise(exerciseId);
    }
  }, [sets]);

  return (
    <View style={styles.container}>
      <View>
        <WorkoutSetTableHeader />
        {sets.map((set, index) => (
          <WorkoutSet
            key={set.id}
            setNum={index + 1}
            set={set}
            exerciseId={exerciseId}
          >
          </WorkoutSet>
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
