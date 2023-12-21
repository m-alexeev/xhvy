import { FC } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { IExercise } from "../../types/exercises";
import { Icon, Text, useTheme } from "react-native-paper";
import { camelCase } from "../../utils/stringParsers";
import { Animated } from "react-native";

interface IExerciseListItem {
  exercise: IExercise;
  onPress: (event: GestureResponderEvent) => void;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
}

const ExerciseListItem: FC<IExerciseListItem> = (
  { exercise, onPress },
) => {
  const theme = useTheme();

  const renderRightAction = (
    icon: React.ReactNode,
    backgroundColor: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
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
      )}
      {renderRightAction(
        <Icon color={theme.colors.onErrorContainer} size={24} source="trash-can" />,
        theme.colors.errorContainer,
        64,
        progress,
      )}
    </View>
  );

  return (
    <Swipeable
      renderRightActions={rightActions}
    >
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
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  tooltipContainer: {},
  tooltip: {},
});

export default ExerciseListItem;
