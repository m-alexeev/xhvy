import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { FC, useCallback, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation";
import { getWorkout } from "@app/zustand/hooks";
import { Button, Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import WorkoutExerciseCardList from "@app/components/workouts/workoutExercise/WorkoutExerciseCardList";
import { IWorkoutExercise } from "@app/types/workouts";
import WorkoutExerciseCard from "@app/components/workouts/workoutExercise/WorkoutExerciseCard";

type EditWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutEditModal"
>;

//NOTE: Try to pass whole object instead of id and fetch
//and check performance
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

  const EditHeader = () => (
    <View style={styles(colors).header}>
      <TextInput
        style={styles(colors).workoutTitle}
        value={workout?.name}
      />
      <Text>{workout?.note}</Text>
      <Text>{workout!.started_at.toLocaleString()}</Text>
      <Text>{workout!.completed_at!.toLocaleString()}</Text>
    </View>
  );


  return (
    <View style={{ flex: 1 }}>
      <View style={styles(colors).container}>
        <FlatList
          ListHeaderComponent={EditHeader}
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
