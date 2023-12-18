import { FC } from "react";
import { GestureResponderEvent, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { IExercise } from "../../types/exercises";
import { List, useTheme, Button, Divider } from "react-native-paper";

interface IExerciseListItem {
  exercise: IExercise;
  onPress: (event: GestureResponderEvent) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  divider: boolean
}

const ExerciseListItem: FC<IExerciseListItem> = ({ exercise, handleDelete, handleEdit, onPress, divider }) => {
  return (
    <View>
      <List.Item
        title={exercise.name}
        onPress={onPress}
      >
      </List.Item>
      {divider && (
        <Divider />
      )}
    </View>
  );
};

export default ExerciseListItem;
