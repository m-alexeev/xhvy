import { FC, useCallback, useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useFilter } from "@app/zustand/filterStore";
import { useExercise } from "@app/zustand/exerciseStore";
import { createSectionList, FirstLetterMapper } from "@app/utils/helpers";
import ExerciseItem from "./ExerciseItem";
import { IExercise } from "@app/types/exercises";
import { getFilteredExercises } from "@app/utils/exercises";
import AddExercisesFab from "./buttons/AddExercisesFab";
import { useNavigation } from "@react-navigation/native";
import { ExerciseDetailsTabProps } from "@app/types/navigation";

interface ExerciseListProps {}

const ExerciseList: FC<ExerciseListProps> = () => {
  const navigation = useNavigation<ExerciseDetailsTabProps>();
  const search = useFilter((state) => state.search);
  const exercises = useExercise((state) => state.exercises);
  const filteredExercises = useMemo(
    () => getFilteredExercises(exercises, search),
    [exercises, search],
  );

  const renderItem = useCallback(
    ({ item }: { item: IExercise }) => (
      <ExerciseItem
        exercise={item}
        mode="link"
        handlePress={() =>
          navigation.navigate("Details", { exercise_id: item.id })}
      />
    ),
    [],
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
