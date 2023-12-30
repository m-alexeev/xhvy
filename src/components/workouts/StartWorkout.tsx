import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootStackNavigationProp } from "../../types/navigation";
import { useWorkout } from "../../zustand/workoutStore";
import ConfirmationPopup from "../core/ConfirmationPopup";

const StartWorkout: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const startWorkout = useWorkout((state) => state.startWorkout);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartPress = () => {
    // Start empty workout
    if (!activeWorkout) {
      startWorkout();
      navigation.navigate("WorkoutModal");
    } else {
      setModalVisible(true);
    }
  };

  const handleModalPress = (confirmed: boolean) => {
    if (confirmed) {
      startWorkout();
      navigation.navigate("WorkoutModal");
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
        Quick Links
      </Text>
      <Button style={styles.button} onPress={handleStartPress} mode="elevated">
        Start Empty Workout
      </Button>
      <ConfirmationPopup
        text={"There is an active workout already started, are you sure you want to cancel and restart it?"}
        visible={modalVisible}
        onConfirm={() => handleModalPress(true)}
        onCancel={() => handleModalPress(false)}
      >
      </ConfirmationPopup>
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
