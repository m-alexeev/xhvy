import { FC } from "react";
import { GestureResponderEvent, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { IExercise } from "../../types/exercises";
import { List, useTheme, Button } from "react-native-paper";

interface IExerciseListItem {
  exercise: IExercise;
  onPress: (event: GestureResponderEvent) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const ExerciseListItem: FC<IExerciseListItem> = ({ exercise, handleDelete, handleEdit, onPress }) => {
  return (
    <View>
      <List.Item
        title={exercise.name}
        onPress={onPress}
      >
      </List.Item>
    </View>
  );
};

export default ExerciseListItem;
