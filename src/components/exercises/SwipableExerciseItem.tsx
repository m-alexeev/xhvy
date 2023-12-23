import { FC } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { IExercise } from "../../types/exercises";
import { Icon, Text, useTheme } from "react-native-paper";
import { Animated } from "react-native";
import ExerciseItem from "./ExerciseItem"
import { ExerciseStore } from "../../zustand/exerciseStore";

interface IExerciseListItem {
  exercise: IExercise;
  onPress: (event: GestureResponderEvent) => void;
}

const SwipableExerciseListItem: FC<IExerciseListItem> = (
  { exercise, onPress},
) => {
  const theme = useTheme();
  const {deleteExercise} = ExerciseStore();

  //TODO: delete popup warning
  const handleDelete = (id: string) => {deleteExercise(id)};
  const handleEdit = (id: string) => {console.log(id)} 

  const renderRightAction = (
    icon: React.ReactNode,
    backgroundColor: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
    handlePress: (id: string) => void,
    textColor?: string,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: trans }],
        }}
      >
        <RectButton
          style={[styles.swipableContainer, {
            backgroundColor: backgroundColor,
            opacity: 0.7,
          }]}
          onPress={()=>handlePress(exercise.id)}
        >
          <Text
            style={[styles.swipableText, {color: textColor}]}
          >
            {icon}
          </Text>
        </RectButton>
      </Animated.View>
    );
  };

  const rightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragX: Animated.AnimatedInterpolation<number>,
  ) => (
    <View style={{ width: 128, flexDirection: "row" }}>
      {renderRightAction(
        <Icon color={theme.colors.onSecondaryContainer} size={24} source="pencil" />,
        theme.colors.secondaryContainer,
        128,
        progress,
        handleEdit
      )}
      {renderRightAction(
        <Icon color={theme.colors.onErrorContainer} size={24} source="trash-can" />,
        theme.colors.errorContainer,
        64,
        progress,
        handleDelete
      )}
    </View>
  );

  return (
    <Swipeable
      renderRightActions={rightActions}
    >
      <ExerciseItem exercise={exercise} onPress={onPress}/>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipableContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  swipableText: {
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  itemContainer: { paddingHorizontal: 5, paddingVertical: 10 },
});

export default SwipableExerciseListItem;