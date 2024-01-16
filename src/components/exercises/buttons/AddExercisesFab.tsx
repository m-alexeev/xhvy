import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useWorkout } from "@app/zustand/workoutStore";
import { Exercise } from "@app/types/exercises";
import { AddMode } from "@app/types/general";

interface AddExercisesFabProps {
  selectedExercises: Exercise[];
  mode: AddMode;
}

const AddExercisesFab: FC<AddExercisesFabProps> = (
  { selectedExercises, mode },
) => {
  const navigation = useNavigation();
  const addExercises = useWorkout((state) => state.addExercises);

  const handlePress = () => {
    if (mode === "active") {
      addExercises(selectedExercises);
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
