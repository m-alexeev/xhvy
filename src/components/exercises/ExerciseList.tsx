import { FC, useEffect, useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useFilter } from "@app/zustand/filterStore";
import { useExercise } from "@app/zustand/exerciseStore";
import { createSectionList, FirstLetterMapper } from "@app/utils/helpers";
import ExerciseItem from "./ExerciseItem";
import { IExercise } from "@app/types/exercises";
import { getFilteredExercises } from "@app/utils/exercises";
import AddExercisesFab from "./buttons/AddExercisesFab";

interface ExerciseListProps {
  selectable?: boolean;
}

const ExerciseList: FC<ExerciseListProps> = ({ selectable = false }) => {
  const search = useFilter((state) => state.search);
  const exercises = useExercise((state) => state.exercises);
  const filteredExercises = useMemo(
    () => getFilteredExercises(exercises, search),
    [exercises, search],
  );

  const renderItem = ({ item }: { item: IExercise }) => (
    <ExerciseItem
      exercise={item}
      selectable={selectable}
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
        initialNumToRender={10}
      >
      </SectionList>
      <AddExercisesFab />
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

export default ExerciseList;
