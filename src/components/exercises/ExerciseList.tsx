import { FC, useCallback, useEffect, useState } from "react";
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

interface ExerciseListProps {
  onPress?: (exercise_id: string) => void;
  select?: boolean;
}

const ExerciseList: FC<ExerciseListProps> = ({ select = false }) => {
  const navigation = useNavigation<ExerciseDetailsTabProps>();
  const search = useFilter((state) => state.search);
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const [activeExercises, setActiveExercises] = useState<string[]>([]);
  const exercises = ExerciseStore((state) => state.exercises);
  const addExercises = useWorkout((state) => state.addExercises);
  const filteredExercises = getFilteredExercises(exercises, search);

  const handlePress = (exercise_id: string) => {
    if (select) {
      if (activeExercises.includes(exercise_id)) {
        setActiveExercises(activeExercises.filter((e) => e !== exercise_id));
      } else {
        setActiveExercises((s) => [...s, exercise_id]);
      }
    } else {
      navigation.navigate("Details", { exercise_id: exercise_id });
    }
  };

  const handleFabPress = () => {
    addExercises(exercises.filter((e) => activeExercises.includes(e.id)));
    navigation.goBack();
  };

  const renderItem = useCallback(
    ({ item }: { item: IExercise }) => (
      <ExerciseItem
        onPress={handlePress}
        exercise={item}
        selected={select && (activeExercises.includes(item.id) ||
          !!activeWorkout?.exercises[item.id])}
      />
    ),
    [handlePress, select],
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
      <FAB
        icon="plus"
        variant="secondary"
        style={[
          styles.fab,
          {
            display: activeExercises.length > 0 ? "flex" : "none",
          },
        ]}
        label={`Add ${activeExercises.length} Exercises`}
        onPress={handleFabPress}
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
