import { StyleSheet } from "react-native";
import React, { FC } from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Exercise } from "@app/types/exercises";

interface AddExercisesFabProps {
  selectedExercises: Exercise[];
  templateId?: string;
  workoutId?: string;
}

const AddExercisesFab: FC<AddExercisesFabProps> = (
  { selectedExercises, templateId, workoutId },
) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    // Navigate to back route from which we came from
    if (templateId) {
      return navigation.navigate("Create", {
        templateId: templateId,
        exercises: selectedExercises,
      });
    }
    if (workoutId) {
    }
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
