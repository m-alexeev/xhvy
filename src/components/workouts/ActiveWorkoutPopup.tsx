import { FC } from "react";
import { useWorkout } from "@app/zustand/workoutStore";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@app/types/navigation";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import WorkoutDuration from "@app/components/core/WorkoutDuration";

const ActiveWorkoutPopup: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { activeWorkout } = useWorkout();
  const { colors } = useTheme();

  if (!activeWorkout) {
    return;
  }

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[styles.container, {
        backgroundColor: colors.secondaryContainer,
      }]}
    >
      <View style={styles.header}>
        <Text variant="titleLarge">{activeWorkout!.name}</Text>
        <WorkoutDuration variant="bodyMedium" />
      </View>
      <Button
        onPress={() =>
          navigation.navigate("WorkoutCreateModal", { templateId: undefined })}
      >
        Resume
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 5,
    justifyContent: "flex-end",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {},
  duration: {},
});

export default ActiveWorkoutPopup;
