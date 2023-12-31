import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useWorkout } from "@app/zustand/workoutStore";
import { Button, useTheme } from "react-native-paper";
import ConfirmationPopup from "@app/components/core/ConfirmationPopup";

const CancelWorkoutButton = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { cancelWorkout } = useWorkout();
  const [modalVisible, setModalVisible] = useState(false);

  const stopWorkout = (confirmed: boolean) => {
    if (confirmed) {
      cancelWorkout();
      navigation.goBack();
    }
    setModalVisible(false);
  };

  return (
    <View>
      <Button
        mode="text"
        onPress={() => setModalVisible(true)}
        textColor={colors.error}
      >
        Cancel Workout
      </Button>
      <ConfirmationPopup
        visible={modalVisible}
        onConfirm={() => stopWorkout(true)}
        onCancel={() => stopWorkout(false)}
      />
    </View>
  );
};

export default CancelWorkoutButton;

const styles = StyleSheet.create({});
