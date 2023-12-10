import { FC } from "react";
import { GestureResponderEvent, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { IExercise } from "../../types/exercises";
import { ListItem, useTheme } from "@rneui/themed";
import { Button } from "@rneui/base";

interface IExerciseListItem {
  exercise: IExercise;
  onPress: (event: GestureResponderEvent) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
}

const ExerciseListItem: FC<IExerciseListItem> = ({ exercise, handleDelete, handleEdit, onPress }) => {
  const { theme } = useTheme();
  return (
    <View>
      <ListItem.Swipeable
        Component={TouchableHighlight}
        onPress={onPress}
        bottomDivider
        rightWidth={90}
        leftWidth={90}
        leftContent={() =>(
          <Button
            icon={{ name: "edit", color: "white" }}
            buttonStyle={{
              minHeight: "100%",
              backgroundColor: theme.colors.secondary,
            }}
            onPress={() => {
              handleEdit(exercise.id);
            }}
          >
          </Button>
        )}
        rightContent={() => (
          <Button
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{
              minHeight: "100%",
              backgroundColor: theme.colors.error,
            }}
            onPress={() => {
              handleDelete(exercise.id);
            }}
          >
          </Button>
        )}
      >
        <ListItem.Content>
          <ListItem.Title>{exercise.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    </View>
  );
};

export default ExerciseListItem;
