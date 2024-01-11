import { StyleSheet, View } from "react-native";
import React from "react";
import ExerciseSearch from "@app/components/exercises/ExerciseSearch";
import SelectableExerciseList from "@app/components/exercises/SelectableExerciseList";

const AddExericse = () => {
  return (
    <View style={styles.container}>
      <ExerciseSearch onShowFilter={() => {}} />
      <SelectableExerciseList />
    </View>
  );
};

export default AddExericse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
});
