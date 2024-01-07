import { StyleSheet, TextInput, View } from "react-native";
import React, { FC } from "react";
import { Button, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useWorkout } from "@app/zustand/workoutStore";
import { WorkoutStackNavigationProp } from "@app/types/navigation";
import WorkoutDuration from "@app/components/core/WorkoutDuration";
import WorkoutExerciseCardList from "@app/components/workouts/workoutExercise/WorkoutExerciseCardList";
import CustomTextInput from "@app/components/core/TextInput";
import CancelWorkout from "@app/components/workouts/CancelWorkout";

interface IWorkoutCreatePageProps {
  navigation: WorkoutStackNavigationProp<"New">["navigation"];
}

const WorkoutCreate: FC<IWorkoutCreatePageProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const updateField = useWorkout((state) => state.updateExercise);

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
            <WorkoutDuration style={{ marginVertical: 5 }} />
            <CustomTextInput
              placeholder="Workout Note"
              value={activeWorkout?.note}
              onChangeText={(text) => () => updateField("note", text)}
            />
          </View>
          <WorkoutExerciseCardList exercises={activeWorkout!.exercises} />
          <Button onPress={addExercise} mode="text">
            Add Exercise
          </Button>
          <CancelWorkout />
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
