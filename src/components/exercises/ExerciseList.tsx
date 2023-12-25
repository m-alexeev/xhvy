import { FC } from "react";
import { SectionList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ExerciseStore } from "../../zustand/exerciseStore";
import { createSectionList, FirstLetterMapper } from "../../utils/helpers";
import { useFilter } from "../../zustand/filterStore";
import ExerciseListItem from "./SwipableExerciseItem";

interface ExerciseListProps {
  onPress?: (exercise_id: string) => void;
  select?: boolean;
}

const ExerciseList: FC<ExerciseListProps> = () => {
  const theme = useTheme();
  const { search } = useFilter();

  const exercises = ExerciseStore((state) => state.exercises);
  const filteredExercises = exercises.filter((
    exercise,
  ) => (exercise.name.toLowerCase().includes(search.trim().toLowerCase())));

  return (
    <SectionList
      sections={createSectionList(filteredExercises, "name", FirstLetterMapper)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ExerciseListItem
          onPress={console.log}
          exercise={item}
          swipable={!!item.modifiable}
        />
      )}
      renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
    >
    </SectionList>
  );
};

export default ExerciseList;
