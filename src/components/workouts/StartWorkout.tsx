import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootStackNavigationProp } from "../../types/navigation";
import { useWorkout } from "../../zustand/workoutStore";

const StartWorkout: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const startWorkout = useWorkout((state) => state.startWorkout);

  const handlePress = () => {
    // Start empty workout
    if (!activeWorkout) {
      startWorkout();
    }
    navigation.navigate("WorkoutModal");
  };

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
        Quick Links
      </Text>
      <Button style={styles.button} onPress={handlePress} mode="elevated">
        Start Empty Workout
      </Button>
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
