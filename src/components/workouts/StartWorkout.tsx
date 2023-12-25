import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { WorkoutStackNavigationProp } from "../../types/navigation";
import { useWorkout } from "../../zustand/workoutStore";

const StartWorkout: FC = () => {
  const { startWorkout, activeWorkout } = useWorkout();
  const navigation = useNavigation<WorkoutStackNavigationProp>();

  const handlePress = () => {
    // Start empty workout
    startWorkout();
    navigation.navigate("Modal");
  };

  if (!activeWorkout) {
    return;
  }

  return (
    <Button style={styles.button} onPress={handlePress}>
      Start Empty Workout
    </Button>
  );
};

export default StartWorkout;

const styles = StyleSheet.create({
  button: {
    marginBottom: 5,
    borderRadius: 10,
  },
});
