import { FC, useCallback, useMemo, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useFilter } from "@app/zustand/filterStore";
import { useExercise } from "@app/zustand/exerciseStore";
import { createSectionList, FirstLetterMapper } from "@app/utils/helpers";
import ExerciseItem from "./ExerciseItem";
import { Exercise } from "@app/types/exercises";
import { getFilteredExercises } from "@app/utils/exercises";
import AddExercisesFab from "./buttons/AddExercisesFab";
import { useWorkout } from "@app/zustand/workoutStore";
import { AddMode } from "@app/types/general";

interface SelectableExerciseListProps {
  mode: AddMode;
}

const SelectableExerciseList: FC<SelectableExerciseListProps> = ({ mode }) => {
  const search = useFilter((state) => state.search);
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const exercises = useExercise((state) => state.exercises);
  const filteredExercises = useMemo(
    () => getFilteredExercises(exercises, search),
    [exercises, search],
  );
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const toggleExercise = (exercise: Exercise) => {
    const index = selectedExercises.findIndex((e) => e.id === exercise.id);
    if (index !== -1) {
      // If exericse not in selected list, add it
      setSelectedExercises((prev) => {
        const updatedExercises = [...prev];
        updatedExercises.splice(index, 1);
        return updatedExercises;
      });
    } else {
      // first check if theyre already selected as part of the workout
      if (!activeWorkout?.exercises[exercise.id]) {
        setSelectedExercises((prev) => [...prev, exercise]);
      }
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: Exercise }) => (
      <ExerciseItem
        exercise={item}
        mode="select"
        selected={!!activeWorkout?.exercises[item.id] ||
          selectedExercises.some((e) => e.id === item.id)}
        handlePress={toggleExercise}
      />
    ),
    [selectedExercises],
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
        initialNumToRender={15}
        windowSize={5}
      >
      </SectionList>
      <AddExercisesFab selectedExercises={selectedExercises} mode={mode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column",
  },
  fab: {
    position: "absolute",
    bottom: 10,
    right: 0,
  },
});

export default SelectableExerciseList;
