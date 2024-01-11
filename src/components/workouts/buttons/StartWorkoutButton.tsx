import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { ButtonProps } from "react-native-paper";
import { RootStackParamList } from "@app/types/navigation";
import { useWorkout } from "@app/zustand/workoutStore";
import ConfirmationButton from "@app/components/core/ConfirmationButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface StartWorkoutButtonProps extends ButtonProps {
  workoutId?: string;
  templateId?: string;
}

const StartWorkoutButton: FC<StartWorkoutButtonProps> = (
  { workoutId, templateId, ...props },
) => {
  const navigation = useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const workouts = useWorkout((state) => state.workouts);
  const startWorkout = useWorkout((state) => state.startWorkout);

  const handleStartPress = () => {
    console.log(workoutId);

    // Start empty workout
    if (!activeWorkout) {
      if (workoutId) {
        startWorkout(workouts[workoutId]);
        navigation.replace("WorkoutCreateModal");
      } else {
        startWorkout();
        navigation.navigate("WorkoutCreateModal");
      }
    }
  };

  const handleModalConfirm = () => {
    console.log(workoutId);
    if (workoutId) {
      startWorkout(workouts[workoutId]);
      navigation.replace("WorkoutCreateModal");
    } else {
      startWorkout();
      navigation.navigate("WorkoutCreateModal");
    }
  };

  return (
    <View style={styles.container}>
      <ConfirmationButton
        style={styles.button}
        onPress={handleStartPress}
        displayPopup={!!activeWorkout}
        mode="elevated"
        popupText="There is an active workout already started, are you sure you want to cancel and restart it?"
        onConfirm={handleModalConfirm}
        {...props}
      >
        {props.children}
      </ConfirmationButton>
    </View>
  );
};

export default StartWorkoutButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  button: {
    marginBottom: 5,
    borderRadius: 10,
  },
});
