import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { WorkoutExercise } from "@app/types/workouts";
import { Text } from "react-native-paper";

interface TemplateExerciseCardProps {
  exercise: WorkoutExercise;
}

const TemplateExerciseCard: FC<TemplateExerciseCardProps> = ({ exercise }) => {
  return (
    <View style={styles.container}>
      <Text>{exercise.name}</Text>
    </View>
  );
};

export default TemplateExerciseCard;

const styles = StyleSheet.create({
  container: {},
});
