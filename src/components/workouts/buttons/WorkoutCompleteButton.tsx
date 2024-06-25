import ConfirmationButton from "@app/components/core/ConfirmationButton";
import { incompleteExercises } from "@app/utils/workout";
import { useWorkout } from "@app/zustand/workoutStore";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

const WorkoutCompleteButton: FC = () => {
  const { colors } = useTheme();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const navigation = useNavigation();
  const saveWorkout = useWorkout((state) => state.saveActiveWorkout);

  const finishWorkout = () => {
    const workoutId = activeWorkout!.id;
    saveWorkout();
    // Navigate to workout complete screen
    navigation.reset({
      index: 0,
      routes: [
        { name: "WorkoutCompleteModal", params: { workoutId: workoutId } },
      ],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <ConfirmationButton
        variant="text"
        style={{ borderRadius: 5 }}
        compact
        textColor={colors.primary}
        popupText="You are about to complete this workout with unfinished exercises"
        onConfirm={finishWorkout}
        mode="text"
        displayPopup={incompleteExercises(activeWorkout?.exercises)}
      >
        Finish Workout
      </ConfirmationButton>
    </View>
  );
};

export default WorkoutCompleteButton;
