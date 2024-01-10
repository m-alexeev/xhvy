import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import ExerciseSearch from "@app/components/exercises/ExerciseSearch";
import ExerciseList from "@app/components/exercises/ExerciseList";

const AddExericse = () => {

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
