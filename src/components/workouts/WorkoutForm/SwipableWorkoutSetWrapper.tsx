import React, { FC, ReactNode } from "react";
import { Animated as RNAnimated, StyleSheet, View } from "react-native";
import { tableStyles } from "./styles";
import { Icon, useTheme } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";

const AnimatedView = RNAnimated.createAnimatedComponent(View);

interface SwipableWorkoutSetInterface {
  onSwipeableOpen: () => void;
  children: ReactNode;
}

const SwipableWorkoutSetWrapper: FC<SwipableWorkoutSetInterface> = (
  { children, onSwipeableOpen },
) => {
  const theme = useTheme();

  // TODO: create custom swipeable component with panGesture and Reanimated
  const renderDelete = (
    _progress: RNAnimated.AnimatedInterpolation<number>,
    dragX: RNAnimated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <View
        style={tableStyles({ theme: theme }).deleteContainer}
      >
        <AnimatedView
          style={[tableStyles({ theme: theme }).deleteView, {
            transform: [{ translateX: trans }],
          }]}
        >
          <Icon size={24} color={theme.colors.errorContainer} source={"delete"}>
          </Icon>
        </AnimatedView>
      </View>
    );
  };
  return (
    <View style={{ marginBottom: 3 }}>
      <Swipeable
        renderRightActions={renderDelete}
        rightThreshold={30}
        friction={2}
        onSwipeableOpen={onSwipeableOpen}
      >
        {children}
      </Swipeable>
    </View>
  );
};

export default SwipableWorkoutSetWrapper;
