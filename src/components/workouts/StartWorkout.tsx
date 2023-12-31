import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { RootStackNavigationProp } from "../../types/navigation";
import { useWorkout } from "../../zustand/workoutStore";
import ConfirmationButton from "../core/ConfirmationButton";

const StartWorkout: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const startWorkout = useWorkout((state) => state.startWorkout);

  const handleStartPress = () => {
    // Start empty workout
    if (!activeWorkout) {
      startWorkout();
      navigation.navigate("WorkoutModal");
    }
  };

  const handleModalConfirm = () => {
    startWorkout();
    navigation.navigate("WorkoutModal");
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

export default StartWorkout;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  button: {
    marginBottom: 5,
    borderRadius: 10,
  },
});
