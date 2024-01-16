import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { WorkoutExercise } from "@app/types/workouts";

interface TemplateExerciseCardProps {
  exercise: WorkoutExercise;
}

const TemplateExerciseCard: FC<TemplateExerciseCardProps> = ({ exercise }) => {
  return (
    <View>
      <Text>TemplateExerciseCard</Text>
    </View>
  );
};

export default TemplateExerciseCard;

const styles = StyleSheet.create({});
