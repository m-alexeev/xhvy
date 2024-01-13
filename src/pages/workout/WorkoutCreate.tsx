import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { FC, useCallback} from "react";
import { Button, useTheme } from "react-native-paper";
import { useWorkout } from "@app/zustand/workoutStore";
import { WorkoutStackNavigationProp } from "@app/types/navigation";
import WorkoutDuration from "@app/components/core/WorkoutDuration";
import CustomTextInput from "@app/components/core/TextInput";
import CancelWorkout from "@app/components/workouts/CancelWorkout";
import { IWorkoutExercise } from "@app/types/workouts";
import WorkoutExerciseCard from "@app/components/workouts/workoutExercise/WorkoutExerciseCard";

interface IWorkoutCreatePageProps {
  navigation: WorkoutStackNavigationProp<"New">["navigation"];
}

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

const WorkoutCreate: FC<IWorkoutCreatePageProps> = ({ navigation }) => {
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const updateSet = useWorkout((s) => s.updateSet);
  const removeSet = useWorkout((s) => s.removeSet);
  const removeExercise = useWorkout((s) => s.removeExercise);

  const renderItem = useCallback(
    ({ item }: { item: IWorkoutExercise }) => (
      <WorkoutExerciseCard
        key={item.id}
        workoutExercise={item}
        updateSet={updateSet}
        removeExercise={removeExercise}
        removeSet={removeSet}
      >
      </WorkoutExerciseCard>
    ),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={ListHeader}
          data={Object.values(activeWorkout!.exercises)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          initialNumToRender={5}
          ListFooterComponent={() => (
            <>
              <Button
                onPress={() => navigation.navigate("AddExericiseModal")}
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
