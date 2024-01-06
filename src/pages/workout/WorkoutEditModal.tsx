import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation";
import { getWorkout } from "@app/zustand/hooks";
import { Text } from "react-native-paper";

type EditWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutEditModal"
>;

//NOTE: Try to pass whole object instead of id and fetch
//and check performance
const WorkoutEditModal: FC<EditWorkoutNavigationProps> = ({ route }) => {
  const { workoutId } = route.params;
  const workout = getWorkout(workoutId);

  return (
    <View>
      <Text variant="bodyMedium">Editing: {workout?.name}</Text>
    </View>
  );
};

export default WorkoutEditModal;

const styles = StyleSheet.create({});
