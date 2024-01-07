import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useWorkout } from "@app/zustand/workoutStore";
import ConfirmationButton from "../core/ConfirmationButton";
import { useTheme } from "react-native-paper";

const CancelWorkout = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const cancelWorkout = useWorkout((s) => s.cancelWorkout);
  const activeWorkout = useWorkout((s) => s.activeWorkout);

  const cancel = () => {
    cancelWorkout();
    navigation.goBack();
  };

  return (
    <ConfirmationButton
      textColor={colors.error}
      popupText="You have active exercises, are you sure you want to cancel?"
      onConfirm={cancel}
      displayPopup={Object.keys(activeWorkout!.exercises).length > 0}
    >
      Cancel Workout
    </ConfirmationButton>
  );
};

export default CancelWorkout;
