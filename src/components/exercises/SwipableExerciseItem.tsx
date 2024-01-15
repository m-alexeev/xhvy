import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Icon, Text, useTheme } from "react-native-paper";
import { Animated } from "react-native";
import { Exercise } from "@app/types/exercises";
import { useExercise } from "@app/zustand/exerciseStore";
import ExerciseItem from "./ExerciseItem";

interface IExerciseListItem {
  exercise: Exercise;
  onPress: (exercise_id: string) => void;
  swipable: boolean;
}

const ExerciseListItem: FC<IExerciseListItem> = (
  { exercise, onPress, swipable },
) => {
  const theme = useTheme();
  const { deleteExercise } = useExercise();

  //TODO: delete popup warning
  const handleDelete = (id: string) => {
    deleteExercise(id);
  };
  const handleEdit = (id: string) => {
    console.log(id);
  };

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
          onPress={() => handlePress(exercise.id)}
        >
          <Text
            style={[styles.swipableText, { color: textColor }]}
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
        <Icon
          color={theme.colors.onSecondaryContainer}
          size={24}
          source="pencil"
        />,
        theme.colors.secondaryContainer,
        128,
        progress,
        handleEdit,
      )}
      {renderRightAction(
        <Icon
          color={theme.colors.onErrorContainer}
          size={24}
          source="trash-can"
        />,
        theme.colors.errorContainer,
        64,
        progress,
        handleDelete,
      )}
    </View>
  );

  if (swipable) {
    return (
      <Swipeable
        renderRightActions={rightActions}
      >
        <ExerciseItem exercise={exercise} onPress={onPress} />
      </Swipeable>
    );
  }
  return <ExerciseItem exercise={exercise} onPress={onPress} />;
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

export default ExerciseListItem;
