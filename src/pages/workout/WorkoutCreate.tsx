import { StyleSheet, TextInput, View } from "react-native";
import React, { FC } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { useWorkout } from "../../zustand/workoutStore";
import TextInputCustom from "../../components/core/TextInput";
import WorkoutDuration from "../../components/core/WorkoutDuration";
import { WorkoutStackNavigationProp } from "../../types/navigation";
import WorkoutList from "../../components/workouts/WorkoutList";

interface IWorkoutCreatePageProps {
  navigation: WorkoutStackNavigationProp<"New">["navigation"];
}

const WorkoutCreate: FC<IWorkoutCreatePageProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { activeWorkout, cancelWorkout } = useWorkout();
  const updateField = useWorkout((state) => state.updateField);
  let updateTimeout: any;

  const stopWorkout = () => {
    cancelWorkout();
    navigation.goBack();
  };

  const updateFieldWithTimeout = (callback: typeof updateField) => {
    // TODO: maybe implement this in future
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(callback, 1000);
  };

  const addExercise = () => {
    navigation.navigate("AddExericiseModal");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={[styles.workoutTitle, { color: colors.onSurface }]}
            value={activeWorkout!.name}
            onChangeText={(text) => () => updateField("name", text)}
          />
          <WorkoutDuration style={{ marginVertical: 5 }} />
          <View style={{ flexDirection: "row" }}>
            <TextInputCustom
              placeholder="Workout Note"
              value={activeWorkout?.note}
              onChangeText={(text) => () => updateField("note", text)}
            />
          </View>
        </View>
        <WorkoutList exercises={activeWorkout!.exercises} />
        <Button
          onPress={addExercise}
          mode="text"
        >
          Add Exercise
        </Button>
        <Button
          textColor={colors.error}
          onPress={stopWorkout}
          mode="text"
        >
          Cancel Workout
        </Button>
      </View>
    </View>
  );
};

export default WorkoutCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    marginBottom: 10,
  },
  workoutTitle: {
    fontSize: 24,
  },
  exerciseContainer: {},
});
