import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { RootStackNavigationProp } from "@app/types/navigation";
import { useWorkout } from "@app/zustand/workoutStore";
import ConfirmationButton from "@app/components/core/ConfirmationButton";

const StartWorkoutButton: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const startWorkout = useWorkout((state) => state.startWorkout);

  const handleStartPress = () => {
    // Start empty workout
    if (!activeWorkout) {
      startWorkout();
      navigation.navigate("WorkoutCreateModal");
    }
  };

  const handleModalConfirm = () => {
    startWorkout();
    navigation.navigate("WorkoutCreateModal");
  };

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
        Quick Links
      </Text>
      <ConfirmationButton
        style={styles.button}
        onPress={handleStartPress}
        displayPopup={!!activeWorkout}
        mode="elevated"
        popupText="There is an active workout already started, are you sure you want to cancel and restart it?"
        onConfirm={handleModalConfirm}
      >
        Start Empty Workout
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
