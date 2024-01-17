import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useWorkout } from "@app/zustand/workoutStore";
import { Exercise } from "@app/types/exercises";
import { AddMode } from "@app/types/general";
import { WorkoutOrTemplate } from "@app/types/templates";

interface AddExercisesFabProps {
  selectedExercises: Exercise[];
  mode: AddMode;
  id: WorkoutOrTemplate["id"];
}

const AddExercisesFab: FC<AddExercisesFabProps> = (
  { selectedExercises, mode, id },
) => {
  const navigation = useNavigation();
  const addExercises = useWorkout((state) => state.addExercises);

  const handlePress = () => {
    if (mode === "active") {
      // add to active workout
      addExercises(selectedExercises);
    }
    if (mode === "workout") {
      // add to workout
    }
    if (mode === "template") {
      // add to template
      addExercises(selectedExercises, id, mode);
    }
    navigation.goBack();
  };

  return (
    <>
      {selectedExercises.length > 0 && (
        <FAB
          icon="plus"
          variant="secondary"
          style={styles.fab}
          label={`Add ${selectedExercises.length} Exercises`}
          onPress={handlePress}
        >
        </FAB>
      )}
    </>
  );
};

export default AddExercisesFab;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 10,
    right: 5,
  },
});
