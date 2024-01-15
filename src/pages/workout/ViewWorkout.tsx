import { SectionList, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import { getWorkout } from "@app/zustand/hooks";
import { createSectionList, NameMapper } from "@app/utils/helpers";
import EditWorkoutButton from "@app/components/workouts/buttons/EditWorkoutButton";
import WorkoutExerciseCardView from "@app/components/workouts/WorkoutExerciseCard";
import StartWorkoutButton from "@app/components/workouts/buttons/StartWorkoutButton";
import { RootStackParamList } from "@app/types/navigation/root";

type ViewWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutViewModal"
>;

const ViewWorkoutModal: FC<ViewWorkoutNavigationProps> = (
  { route },
) => {
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
      <View style={styles.workoutHeader}>
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
      <View style={{ gap: 5 }}>
        <EditWorkoutButton mode="elevated" workoutId={workoutId}>
          Edit Workout
        </EditWorkoutButton>
        <StartWorkoutButton
          style={{ borderRadius: 5 }}
          mode="contained"
          workoutId={workoutId}
        >
          Perform Again
        </StartWorkoutButton>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={createSectionList(
          Object.values(workout.exercises),
          "name",
          NameMapper,
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkoutExerciseCardView exercise={item} />}
        ListHeaderComponent={WorkoutHeader}
        ListFooterComponent={WorkoutFooter}
      >
      </SectionList>
    </View>
  );
};

export default ViewWorkoutModal;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  workoutHeader: {
    marginBottom: 10,
  },
});
