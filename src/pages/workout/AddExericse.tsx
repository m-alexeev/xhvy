import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import ExerciseSearch from "../../components/exercises/ExerciseSearch";
import ExerciseList from "../../components/exercises/ExerciseList";

const AddExericse = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ExerciseSearch onShowFilter={() => {}} />
      <ExerciseList select/>
    </View>
  );
};

export default AddExericse;

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal: 5,
  }
});
