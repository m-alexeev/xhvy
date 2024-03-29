import { StyleSheet, TextInput, View } from "react-native";
import React, { FC, useCallback, useEffect } from "react";
import { Button, useTheme } from "react-native-paper";
import { useWorkout } from "@app/zustand/workoutStore";
import WorkoutDuration from "@app/components/core/WorkoutDuration";
import CustomTextInput from "@app/components/core/TextInput";
import CancelWorkout from "@app/components/workouts/CancelWorkout";
import { WorkoutExercise } from "@app/types/workouts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation/root";
import { FlashList } from "@shopify/flash-list";
import WorkoutExerciseCard from "@app/components/workouts/WorkoutForm/WorkoutExerciseCard";

type WorkoutCreateNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutCreateModal"
>;

const ListHeader: FC = () => {
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const { colors } = useTheme();
  const updateField = useWorkout((s) => s.updateField);

  return (
    <View style={styles.header}>
      <TextInput
        style={[styles.workoutTitle, { color: colors.onSurface }]}
        value={activeWorkout!.name}
        onChangeText={(text) => updateField("name", text)}
      />
      <WorkoutDuration style={{ marginVertical: 5 }} />
      <CustomTextInput
        placeholder="Workout Note"
        value={activeWorkout?.note}
        onChangeText={(text) => updateField("note", text)}
      />
    </View>
  );
};

const WorkoutCreate: FC<WorkoutCreateNavigationProps> = (
  { navigation, route },
) => {
  const activeWorkout = useWorkout((s) => s.activeWorkout);
  const params = route.params || {};
  const addExercises = useWorkout((s) => s.addExercises);

  useEffect(() => {
    if (params.exercises) {
      addExercises(params.exercises, undefined, "active");
    }
  }, [params.exercises]);

  const renderItem = useCallback(
    ({ item }: { item: WorkoutExercise }) => (
      <WorkoutExerciseCard
        key={item.id}
        workoutExercise={item}
      >
      </WorkoutExerciseCard>
    ),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlashList
          ListHeaderComponent={ListHeader}
          data={Object.values(activeWorkout!.exercises)}
          estimatedItemSize={120}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <>
              <Button
                onPress={() =>
                  navigation.navigate("AddExerciseModal", {
                    selectedExercises: Object.keys(
                      activeWorkout?.exercises || {},
                    ),
                  })}
                mode="text"
              >
                Add Exercise
              </Button>
              <CancelWorkout />
            </>
          )}
        />
      </View>
    </View>
  );
};

export default WorkoutCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header: {
    marginBottom: 10,
  },
  workoutTitle: {
    fontSize: 24,
  },
  exerciseContainer: {},
});
