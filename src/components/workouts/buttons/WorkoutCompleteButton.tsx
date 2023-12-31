import ConfirmationButton from "@app/components/core/ConfirmationButton";
import { useWorkout } from "@app/zustand/workoutStore";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const WorkoutCompleteButton: FC = () => {
  const {colors} = useTheme()
  const saveWorkout = useWorkout((state) => state.saveWorkout);
  const navigation = useNavigation();

  const finishWorkout = () => {
    saveWorkout();
    navigation.goBack();
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
        style={{ borderRadius: 5 }}
        compact
        textColor={colors.primary}
        popupText="You are about to complete this workout"
        onConfirm={finishWorkout}
        mode="text"
      >
        Finish Workout
      </ConfirmationButton>
    </View>
  );
};

export default WorkoutCompleteButton;