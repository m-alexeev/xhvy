import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { WorkoutExercise } from "@app/types/workouts";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import IconButton from "../core/IconButton";
import { camelCase } from "@app/utils/stringParsers";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface TemplateExerciseCardProps {
  exercise: WorkoutExercise;
  updateExercise: (exercise: WorkoutExercise, mode: "add" | "delete") => void;
}

const TemplateExerciseCard: FC<TemplateExerciseCardProps> = (
  { exercise, updateExercise },
) => {
  const { colors } = useTheme();
      // <View style={styles().body}>
      //   <Text variant="labelMedium">
      //     // {camelCase(exercise.primaryMuscleGroups!.toString(), ",", ", ")}
      //   </Text>
      //   {exercise.tags && exercise.tags?.length > 0 && (
      //     <Text variant="labelMedium" style={{ color: colors.outline }}>
      //       {camelCase(exercise.tags.toString(), ",", ", ")}
      //     </Text>
      //   )}
      // </View>
  return (
    <View style={styles(colors).container}>
      <View style={styles().header}>
        <Text variant="titleMedium">{camelCase(exercise.name)}</Text>
        <IconButton
          icon={faTrash}
          color={colors.error}
          onPress={() => updateExercise(exercise, "delete")}
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
    body: {},
  });
