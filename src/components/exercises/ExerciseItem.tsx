import { StyleSheet, TouchableHighlight, View } from "react-native";
import { FC, memo } from "react";
import { Text, useTheme } from "react-native-paper";
import { IExercise } from "@app/types/exercises";
import { camelCase } from "@app/utils/stringParsers";
import { useExercise } from "@app/zustand/exerciseStore";
import { useNavigation } from "@react-navigation/native";
import { ExerciseDetailsTabProps } from "@app/types/navigation";

interface ExerciseItemProps {
  exercise: IExercise;
  selectable: boolean;
}

const ExerciseItem: FC<ExerciseItemProps> = (
  { exercise, selectable },
) => {
  const theme = useTheme();
  const navigation = useNavigation<ExerciseDetailsTabProps>();
  const selectedExercises = useExercise((s) => s.selectedExercises);
  const selectExercise = useExercise((s) => s.selectExercise);

  const handlePress = () => {
    if (selectable) {
      selectExercise(exercise);
    } else {
      navigation.navigate("Details", { exercise_id: exercise.id });
    }
  };

  return (
    <View
      style={[styles.container, {
        backgroundColor: selectedExercises.includes(exercise)
          ? theme.colors.surfaceVariant
          : theme.colors.background,
      }]}
    >
      <TouchableHighlight
        style={[styles.itemContainer]}
        onPress={handlePress}
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
export default memo(ExerciseItem);
