import { FC, useCallback, useState } from "react";
import { SectionList, StyleSheet } from "react-native";
import { FAB, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFilter } from "@app/zustand/filterStore";
import { ExerciseDetailsTabProps } from "@app/types/navigation";
import { ExerciseStore } from "@app/zustand/exerciseStore";
import { useWorkout } from "@app/zustand/workoutStore";
import { createSectionList, FirstLetterMapper } from "@app/utils/helpers";
import ExerciseItem from "./ExerciseItem";
import { IExercise } from "@app/types/exercises";

interface ExerciseListProps {
  onPress?: (exercise_id: string) => void;
  select?: boolean;
}

const ExerciseList: FC<ExerciseListProps> = ({ select}) => {
  const { search } = useFilter();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const navigation = useNavigation<ExerciseDetailsTabProps>();
  const [activeExercises, setActiveExercises] = useState<string[]>([]);
  const exercises = ExerciseStore((state) => state.exercises);
  const { addExercises } = useWorkout();
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  // FIX: this page gets re-rendered when an exercise is removed...

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

  // TODO: refactor this component as it currently has more than 1 function
  const handleFabPress = () => {
    addExercises(exercises.filter((e) => activeExercises.includes(e.id)));
    navigation.goBack();
  };

  const renderItem = useCallback(
    ({ item }: { item: IExercise }) => (
      <ExerciseItem
        onPress={handlePress}
        exercise={item}
        selected={(activeExercises.includes(item.id) ||
          !!activeWorkout?.exercises[item.id])}
      />
    ),
    [],
  );

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    right: 0,
  },
});

export default ExerciseList;
