import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFilter } from "@app/zustand/filterStore";
import { ExerciseDetailsTabProps } from "@app/types/navigation";
import { ExerciseStore } from "@app/zustand/exerciseStore";
import { useWorkout } from "@app/zustand/workoutStore";
import { createSectionList, FirstLetterMapper } from "@app/utils/helpers";
import ExerciseItem from "./ExerciseItem";
import { IExercise } from "@app/types/exercises";
import { getFilteredExercises } from "@app/utils/exercises";
import AddExercisesFab from "./buttons/AddExercisesFab";

interface ExerciseListProps {
  onPress?: (exercise_id: string) => void;
  select?: boolean;
}

const ExerciseList: FC<ExerciseListProps> = ({ select = false }) => {
  const navigation = useNavigation<ExerciseDetailsTabProps>();
  const search = useFilter((state) => state.search);
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const [activeExercises, setActiveExercises] = useState<Set<string>>(() =>
    new Set()
  );
  const exercises = ExerciseStore((state) => state.exercises);
  const filteredExercises = useMemo(
    () => getFilteredExercises(exercises, search),
    [exercises, search],
  );

  const handlePress = useCallback((exercise_id: string) => {
    if (select) {
      if (activeExercises.has(exercise_id)) {
        setActiveExercises((s) => {
          const next = new Set(s);
          next.delete(exercise_id);
          return next;
        });
      } else {
        setActiveExercises((s) => new Set(s).add(exercise_id));
      }
    } else {
      navigation.navigate("Details", { exercise_id: exercise_id });
    }
  }, [select, activeExercises, navigation]);

  const renderItem = useCallback(
    ({ item }: { item: IExercise }) => (
      <ExerciseItem
        onPress={handlePress}
        exercise={item}
        selected={select && (activeExercises.has(item.id) ||
          !!activeWorkout?.exercises[item.id])}
      />
    ),
    [handlePress, activeExercises, activeWorkout],
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={createSectionList(
          filteredExercises,
          "name",
          FirstLetterMapper,
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      >
      </SectionList>
      <AddExercisesFab
        activeExercises={activeExercises}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
  },
  fab: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
});

export default ExerciseList;
