import { StyleSheet, TextInput, View } from "react-native";
import React, { FC } from "react";
import { Button, useTheme } from "react-native-paper";
import { useWorkout } from "../../zustand/workoutStore";
import TextInputCustom from "../../components/core/TextInput";
import WorkoutDuration from "../../components/core/WorkoutDuration";
import { WorkoutStackNavigationProp } from "../../types/navigation";
import WorkoutExerciseCardList from "../../components/workouts/workoutExercise/WorkoutExerciseCardList";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/core/IconButton";
import { ScrollView } from "react-native-gesture-handler";

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

  //NOTE: This can be used but we must keep an internal state for this component
  // only call the updator
  const updateFieldWithTimeout = (callback: typeof updateField) => {
    // TODO: maybe implement this in future
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(callback, 1000);
  };

  const addExercise = () => {
    navigation.navigate("AddExericiseModal");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <IconButton
              onPress={() => navigation.goBack()}
              icon={"chevron-down"}
            >
            </IconButton>
            <TextInput
              style={[styles.workoutTitle, { color: colors.onSurface }]}
              value={activeWorkout!.name}
              onChangeText={(text) => () => updateField("name", text)}
            />
          </View>
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
        <ScrollView>
          <WorkoutExerciseCardList exercises={activeWorkout!.exercises} />
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
        </ScrollView>
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
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  workoutTitle: {
    marginLeft: 10,
    fontSize: 24,
  },
  exerciseContainer: {},
});
