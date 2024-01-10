import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useWorkout } from "@app/zustand/workoutStore";
import { useExercise } from "@app/zustand/exerciseStore";

interface AddExercisesFabProps {
}

const AddExercisesFab: FC<AddExercisesFabProps> = (
  {},
) => {
  const navigation = useNavigation();
  const addExercises = useWorkout((state) => state.addExercises);
  const exercises = useExercise((state) => state.exercises);
  const activeExercises = useExercise((state) => state.selectedExercises);
  const clearSelected = useExercise((state) => state.clearSelection);

  const handlePress = () => {
    addExercises(exercises.filter((e) => activeExercises.includes(e)));
    clearSelected();
    navigation.goBack();
  };

  return (
    <>
      {activeExercises.length > 0 && (
        <FAB
          icon="plus"
          variant="secondary"
          style={styles.fab}
          label={`Add ${activeExercises.length} Exercises`}
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
