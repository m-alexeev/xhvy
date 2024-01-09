import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useWorkout } from "@app/zustand/workoutStore";
import { ExerciseStore } from "@app/zustand/exerciseStore";

interface AddExercisesFabProps {
  activeExercises: Set<string>;
}

const AddExercisesFab: FC<AddExercisesFabProps> = (
  { activeExercises },
) => {
  const navigation = useNavigation();
  const addExercises = useWorkout((state) => state.addExercises);
  const exercises = ExerciseStore((state) => state.exercises);

  const handlePress = () => {
    addExercises(exercises.filter((e) => activeExercises.has(e.id)));
    navigation.goBack();
  };

  return (
    <>
      {activeExercises.size > 0 && (
        <FAB
          icon="plus"
          variant="secondary"
          style={styles.fab}
          label={`Add ${activeExercises.size} Exercises`}
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
