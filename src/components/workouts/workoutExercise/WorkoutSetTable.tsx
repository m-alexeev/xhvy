import { StyleSheet, View } from "react-native";
import React, { FC, useEffect } from "react";
import { IWorkoutSet } from "../../../types/workouts";
import { Text, useTheme } from "react-native-paper";
import WorkoutSet from "./WorkoutSet";
import { useWorkout } from "../../../zustand/workoutStore";
import { tableStyles } from "./styles";

interface WorkoutSetTableProps {
  sets: IWorkoutSet[];
  exerciseId: string;
}

const WorkoutSetTableHeader: FC = () => {
  return (
    <View style={tableStyles({}).headerRow}>
      <Text style={tableStyles({ width: 0.6 }).headerColumn}>
        Set
      </Text>
      <Text style={tableStyles({}).headerColumn}>
        Previous
      </Text>
      <Text style={tableStyles({}).headerColumn}>
        Weight
      </Text>
      <Text style={tableStyles({}).headerColumn}>
        Reps
      </Text>
      <View style={tableStyles({ width: 0.6 }).headerColumn}>
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
    <View style={tableStyles({}).container}>
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
  );
};

export default WorkoutSetTable;

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.6,
  },
  headerColumn: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexGrow: 1,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 7,
    height: 30,
    alignItems: "center",
  },
  tableCol: {
    textAlign: "center",
    flex: 1,
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
