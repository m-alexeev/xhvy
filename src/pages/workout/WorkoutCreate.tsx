import { StyleSheet, TextInput, View } from "react-native";
import React, { FC } from "react";
import { Button, useTheme } from "react-native-paper";
import { useWorkout } from "../../zustand/workoutStore";
import TextInputCustom from "../../components/core/TextInput";
import WorkoutDuration from "../../components/core/WorkoutDuration";
import { WorkoutStackNavigationProp } from "../../types/navigation";
import WorkoutExerciseCardList from "../../components/workouts/workoutExercise/WorkoutExerciseCardList";
import { ScrollView } from "react-native-gesture-handler";
import ConfirmationButton from "@app/components/core/ConfirmationButton";

interface IWorkoutCreatePageProps {
  navigation: WorkoutStackNavigationProp<"New">["navigation"];
}

const WorkoutCreate: FC<IWorkoutCreatePageProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { activeWorkout, cancelWorkout, saveWorkout } = useWorkout();
  const updateField = useWorkout((state) => state.updateExercise);
  let updateTimeout: any;

  //FIX: Refactor page, remove as much state related
  // functions into separate components as possible
  const finishWorkout = () => {
    saveWorkout();
    navigation.goBack();
  };

  const stopWorkout = () => {
    cancelWorkout();
    navigation.goBack();
  };

  //NOTE: This can be used but we must keep an internal state for this component
  // only call the updator
  const updateFieldWithTimeout = (callback: typeof updateField) => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(callback, 1000);
  };

  const addExercise = () => {
    navigation.navigate("AddExericiseModal");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TextInput
              style={[styles.workoutTitle, { color: colors.onSurface }]}
              value={activeWorkout!.name}
              onChangeText={(text) => () => updateField("name", text)}
            />
            <View>
              <WorkoutDuration style={{ marginVertical: 5 }} />
              <View style={{ flexDirection: "row" }}>
                <TextInputCustom
                  placeholder="Workout Note"
                  value={activeWorkout?.note}
                  onChangeText={(text) => () => updateField("note", text)}
                />
              </View>
            </View>
          </View>
          <WorkoutExerciseCardList exercises={activeWorkout!.exercises} />
          <Button onPress={addExercise} mode="text">
            Add Exercise
          </Button>
          <ConfirmationButton textColor={colors.error} onConfirm={stopWorkout}>
            Cancel
          </ConfirmationButton>
        </View>
      </ScrollView>
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
