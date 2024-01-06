import { SectionList, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation";
import { Text, useTheme } from "react-native-paper";
import { getWorkout } from "@app/zustand/hooks";
import { createSectionList, NameMapper } from "@app/utils/helpers";
import { IWorkoutExercise } from "@app/types/workouts";
import { brzyckiFormula } from "@app/utils/formulas";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { camelCase } from "@app/utils/stringParsers";
import RestartWorkoutButton from "@app/components/workouts/buttons/RestartWorkoutButton";
import WorkoutCompleteButton from "@app/components/workouts/buttons/WorkoutCompleteButton";
import EditWorkoutButton from "@app/components/workouts/buttons/EditWorkoutButton";

type ViewWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutViewModal"
>;

const ExerciseView = ({ exercise }: { exercise: IWorkoutExercise }) => {
  const { colors } = useTheme();
  return (
    <View style={styles(colors).exerciseContainer}>
      <Text style={styles(colors).exerciseHeader} variant="titleMedium">
        {camelCase(exercise.name)}
      </Text>
      <View style={styles(colors).setContainer}>
        <View style={styles(colors).row}>
          <Text variant="titleSmall" style={styles(colors).indexHeader}>
            Completed Sets
          </Text>
          <Text
            variant="titleSmall"
            style={[styles(colors).col, { textAlign: "right" }]}
          >
            1RM
          </Text>
        </View>
        {exercise.sets.map((set, index) => {
          return (
            <View key={set.id} style={styles(colors).row}>
              <Text variant="bodyMedium" style={styles(colors).index}>
                {index + 1}
              </Text>
              <Text variant="bodyMedium" style={styles(colors).col}>
                {set.weight}kg x {set.reps}
              </Text>
              {!exercise.tags?.includes("calisthenics") &&
                (
                  <Text
                    variant="bodyMedium"
                    style={[styles(colors).col, { textAlign: "right" }]}
                  >
                    {brzyckiFormula(set.weight || 0, set.reps || 0)}kg
                  </Text>
                )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const ViewWorkoutModal: FC<ViewWorkoutNavigationProps> = (
  { route },
) => {
  const { colors } = useTheme();
  const { workoutId } = route.params;
  const workout = getWorkout(workoutId);

  if (!workout) {
    return (
      <View>
        <Text>Workout does not exist</Text>
      </View>
    );
  }

  const WorkoutHeader = () => {
    return (
      <View style={styles(colors).workoutHeader}>
        <Text variant="titleLarge">{workout.name}</Text>
        <View>
          <Text variant="labelMedium">
            Performed on: {workout.started_at.toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  const WorkoutFooter = () => {
    return (
      <View style={{gap: 5}}>
        <EditWorkoutButton mode="elevated" workoutId={workoutId}>Edit Workout</EditWorkoutButton>
        <RestartWorkoutButton workoutId={workoutId}>Perform again</RestartWorkoutButton>
      </View>
    )
  }

  return (
    <View style={styles(colors).container}>
      <SectionList
        sections={createSectionList(
          Object.values(workout.exercises),
          "name",
          NameMapper,
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExerciseView exercise={item} />}
        ListHeaderComponent={WorkoutHeader}
        ListFooterComponent={WorkoutFooter}
      >
      </SectionList>
    </View>
  );
};

export default ViewWorkoutModal;

const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      padding: 10,
    },
    workoutHeader: {
      marginBottom: 10,
    },
    exerciseContainer: {
      backgroundColor: colors.elevation.level2,
      borderRadius: 5,
      padding: 5,
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    exerciseHeader: {
      marginBottom: 5,
    },
    setContainer: { gap: 5 },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    indexHeader: {
      flex: 1,
    },
    index: {
      flex: 1,
      marginRight: 10,
      marginLeft: -3,
      textAlign: "center",
      flexGrow: 0.1,
    },
    col: {
      textAlign: "left",
      flex: 1,
    },
  });
