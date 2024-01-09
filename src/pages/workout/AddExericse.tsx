import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import ExerciseSearch from "@app/components/exercises/ExerciseSearch";
import ExerciseList from "@app/components/exercises/ExerciseList";
import { useExercise } from "@app/zustand/exerciseStore";
import { useWorkout } from "@app/zustand/workoutStore";

const AddExericse = () => {
  const selectExercises = useExercise((state) => state.selectExercise);
  const activeWorkout = useWorkout((state) => state.activeWorkout);

  useEffect(() => {
    console.log("select");
    
    Object.values(activeWorkout!.exercises).forEach((e) => {
      console.log(e);
      selectExercises(e);
    });
  }, [activeWorkout?.exercises]);

  return (
    <View style={styles.container}>
      <ExerciseSearch onShowFilter={() => {}} />
      <ExerciseList selectable />
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
