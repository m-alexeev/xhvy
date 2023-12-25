import { StyleSheet, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, useTheme } from "react-native-paper";
import { useWorkout } from "../../zustand/workoutStore";
import { useNavigation } from "@react-navigation/native";
import { formatTime } from "../../utils/helpers";
import TextInputCustom from "../../components/core/TextInput";

const WorkoutCreate = () => {
  const { colors } = useTheme();
  const { activeWorkout, cancelWorkout } = useWorkout();
  const updateField = useWorkout((state) => state.updateField);
  const navigation = useNavigation();

  const stopWorkout = () => {
    cancelWorkout();
    navigation.goBack();
  };

  const addExercise = () => {
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={[styles.workoutTitle, { color: colors.onSurface }]}
            value={activeWorkout!.name}
            onChangeText={(text) => updateField("name", text)}
          />
          <Text>{formatTime(activeWorkout!.duration)}</Text>
          <TextInputCustom
            isFocused
            value={activeWorkout?.note}
            onChangeText={(text) => updateField("note", text)}
          />
        </View>
        <Button
          onPress={addExercise}
          mode="text"
        >
          Add Exercise
        </Button>
        <Button
          textColor={colors.error}
          onPress={stopWorkout}
          mode="text"
        >
          Cancel Workout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  workoutTitle: {
    fontSize: 24,
  },
});
