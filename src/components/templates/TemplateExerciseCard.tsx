import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { WorkoutExercise } from "@app/types/workouts";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

interface TemplateExerciseCardProps {
  exercise: WorkoutExercise;
}

const TemplateExerciseCard: FC<TemplateExerciseCardProps> = ({ exercise }) => {
  const { colors } = useTheme();
  return (
    <View style={styles(colors).container}>
      <Text variant="titleMedium">{exercise.name}</Text>
    </View>
  );
};

export default TemplateExerciseCard;

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors?.elevation.level4,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
  });
