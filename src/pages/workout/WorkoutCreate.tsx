import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, useTheme } from "react-native-paper";
import { useWorkout } from "../../zustand/workoutStore";
import { useNavigation } from "@react-navigation/native";
import TextInputCustom from "../../components/core/TextInput";
import WorkoutDuration from "../../components/core/WorkoutDuration";
import { IWorkout } from "../../types/workouts";

const WorkoutCreate = () => {
  const { colors } = useTheme();
  const { activeWorkout, cancelWorkout } = useWorkout();
  const updateField = useWorkout((state) => state.updateField);
  const navigation = useNavigation();
  let updateTimeout: any;

  const stopWorkout = () => {
    cancelWorkout();
    navigation.goBack();
  };

  const updateFieldWithTimeout = (callback: typeof updateField) => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(callback, 1000);
  };

  const addExercise = () => {
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={[styles.workoutTitle, { color: colors.onSurface }]}
            value={activeWorkout!.name}
            onChangeText={(text) => updateField("name", text)}
          />
          <WorkoutDuration style={{ marginVertical: 5 }} />
          <TextInputCustom
            placeholder="Workout Note"
            value={activeWorkout?.note}
            onChangeText={(text) => updateField("note", text)}
          />
        </View>
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
    </SafeAreaView>
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
});
