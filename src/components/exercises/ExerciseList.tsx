import { FC, useCallback, useMemo, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFilter } from "@app/zustand/filterStore";
import { useExercise } from "@app/zustand/exerciseStore";
import { createSectionList, FirstLetterMapper } from "@app/utils/helpers";
import ExerciseItem from "./ExerciseItem";
import { IExercise } from "@app/types/exercises";
import { getFilteredExercises } from "@app/utils/exercises";
import AddExercisesFab from "./buttons/AddExercisesFab";

interface ExerciseListProps {
}

const ExerciseList: FC<ExerciseListProps> = () => {
  const search = useFilter((state) => state.search);
  const exercises = useExercise((state) => state.exercises);
  const filteredExercises = useMemo(
    () => getFilteredExercises(exercises, search),
    [exercises, search],
  );

  const renderItem = ({ item }: { item: IExercise }) => (
    <ExerciseItem
      exercise={item}
      selectable
    />
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
      <AddExercisesFab />
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
