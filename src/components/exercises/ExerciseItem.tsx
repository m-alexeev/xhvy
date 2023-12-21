import { FC } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { IExercise } from "../../types/exercises";
import { Button, Divider, List, Text, useTheme } from "react-native-paper";
import { camelCase } from "../../utils/stringParsers";

interface IExerciseListItem {
  exercise: IExercise;
  onPress: (event: GestureResponderEvent) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const ExerciseListItem: FC<IExerciseListItem> = (
  { exercise, handleDelete, handleEdit, onPress },
) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[styles.itemContainer, {}]}
        onPress={onPress}
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
  tooltipContainer: {},
  tooltip: {},
});

export default ExerciseListItem;
