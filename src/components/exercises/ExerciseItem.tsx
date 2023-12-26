import { StyleSheet, TouchableHighlight, View } from "react-native";
import { FC } from "react";
import { camelCase } from "../../utils/stringParsers";
import { IExercise } from "../../types/exercises";
import { Text, useTheme } from "react-native-paper";

interface ExerciseItemProps {
  exercise: IExercise;
  onPress: (exercise_id: string) => void;
  selected: boolean;
}

const ExerciseItem: FC<ExerciseItemProps> = (
  { exercise, onPress, selected },
) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, {
        backgroundColor: selected
          ? theme.colors.surfaceVariant
          : theme.colors.background,
      }]}
    >
      <TouchableHighlight
        style={[styles.itemContainer]}
        onPress={() => onPress(exercise.id)}
        underlayColor={theme.colors.secondaryContainer}
      >
        <View>
          <Text variant="titleMedium">
            {camelCase(exercise.name)}
          </Text>
          {exercise.primaryMuscleGroups && (
            <Text style={{ opacity: 0.7 }}>
              {camelCase(exercise.primaryMuscleGroups.toString(), ",", ", ")}
            </Text>
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemContainer: { paddingHorizontal: 5, paddingVertical: 10 },
});
export default ExerciseItem;
