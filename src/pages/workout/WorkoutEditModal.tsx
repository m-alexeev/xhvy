import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { FC, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation";
import { useWorkout } from "@app/zustand/workoutStore";
import { getWorkout } from "@app/zustand/hooks";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { IWorkout, IWorkoutExercise } from "@app/types/workouts";
import WorkoutExerciseCard from "@app/components/workouts/workoutExercise/WorkoutExerciseCard";
import CustomTextInput from "@app/components/core/TextInput";

type EditWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutEditModal"
>;

const EditHeader = ({ workout }: { workout: IWorkout }) => {
  const { colors } = useTheme();
  const updateField = useWorkout((state) => state.updateField);
  return (
    <View style={styles(colors).header}>
      <TextInput
        style={styles(colors).workoutTitle}
        value={workout?.name}
        onChangeText={(text) => updateField("name", text, workout.id)}
      />
      <CustomTextInput
        value={workout.note}
        placeholderTextColor={colors.outline}
        placeholder="Workout Note"
        onChangeText={(text) => updateField("note", text, workout.id)}
      >
      </CustomTextInput>
      <Text>{workout!.started_at.toLocaleString()}</Text>
      <Text>{workout!.completed_at!.toLocaleString()}</Text>
    </View>
  );
};

const WorkoutEditModal: FC<EditWorkoutNavigationProps> = ({ route }) => {
  const { colors } = useTheme();
  const { workoutId } = route.params;
  const workout = getWorkout(workoutId);

  const renderItem = useCallback(
    ({ item }: { item: IWorkoutExercise }) => (
      <WorkoutExerciseCard
        key={item.id}
        workoutExercise={item}
        workoutId={workoutId}
      >
      </WorkoutExerciseCard>
    ),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles(colors).container}>
        <FlatList
          ListHeaderComponent={<EditHeader workout={workout} />}
          data={Object.values(workout.exercises)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          initialNumToRender={5}
        >
        </FlatList>
      </View>
    </View>
  );
};

export default WorkoutEditModal;

const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: { flex: 1, margin: 10 },
    header: { marginBottom: 10 },
    workoutTitle: {
      fontSize: 24,
      color: colors.onSurface,
    },
  });
