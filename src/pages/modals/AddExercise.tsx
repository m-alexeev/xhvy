import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import ExerciseSearch from "@app/components/exercises/ExerciseSearch";
import SelectableExerciseList from "@app/components/exercises/SelectableExerciseList";
import { RootStackParamList } from "@app/types/navigation/root";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AddExercisePageNavProps = NativeStackScreenProps<
  RootStackParamList,
  "AddExerciseModal"
>;


const AddExercisePage: FC<AddExercisePageNavProps> = ({ route }) => {
  const selectedExercises = route.params.selectedExercises || [];
  const templateId = route.params.templateId;
  const workoutId = route.params.workoutId;

  return (
    <View style={styles.container}>
      <ExerciseSearch onShowFilter={() => {}} />
      <SelectableExerciseList
        selectedExercises={selectedExercises}
        templateId={templateId}
        workoutId={workoutId}
      />
    </View>
  );
};

export default AddExercisePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
});
