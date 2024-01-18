import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { WorkoutExercise } from "@app/types/workouts";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import IconButton from "../core/IconButton";

interface TemplateExerciseCardProps {
  exercise: WorkoutExercise;
  onDelete: (exerciseId: string) => void;
}

const TemplateExerciseCard: FC<TemplateExerciseCardProps> = (
  { exercise, onDelete },
) => {
  const { colors } = useTheme();
  return (
    <View style={styles(colors).container}>
      <View style={styles().header}>
        <Text variant="titleMedium">{exercise.name}</Text>
        <IconButton
          icon="delete"
          color={colors.error}
          onPress={() => onDelete(exercise.id)}
        />
      </View>
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
    header: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
    },
  });
