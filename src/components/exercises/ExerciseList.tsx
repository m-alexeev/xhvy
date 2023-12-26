import { FC, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { FAB, Text, useTheme } from "react-native-paper";
import { ExerciseStore } from "../../zustand/exerciseStore";
import { createSectionList, FirstLetterMapper } from "../../utils/helpers";
import { useFilter } from "../../zustand/filterStore";
import ExerciseItem from "./ExerciseItem";
import { useNavigation } from "@react-navigation/native";
import { ExerciseDetailsTabProps } from "../../types/navigation";
import { useWorkout } from "../../zustand/workoutStore";

interface ExerciseListProps {
  onPress?: (exercise_id: string) => void;
  select?: boolean;
}

const ExerciseList: FC<ExerciseListProps> = ({ select }) => {
  const theme = useTheme();
  const { search } = useFilter();

  const navigation = useNavigation<ExerciseDetailsTabProps>();
  const [activeExercises, setActiveExercises] = useState<string[]>([]);
  const exercises = ExerciseStore((state) => state.exercises);
  const { addExercises } = useWorkout();
  const filteredExercises = exercises.filter((
    exercise,
  ) => (exercise.name.toLowerCase().includes(search.trim().toLowerCase())));

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

  return (
    <>
      <SectionList
        sections={createSectionList(
          filteredExercises,
          "name",
          FirstLetterMapper,
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExerciseItem
            onPress={handlePress}
            exercise={item}
            selected={activeExercises.includes(item.id)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      >
      </SectionList>
      <FAB
        icon="plus"
        variant="secondary"
        style={[styles.fab, {
          display: activeExercises.length > 0 ? "flex" : "none",
        }]}
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
