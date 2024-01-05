import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation";
import { useWorkout } from "@app/zustand/workoutStore";
import { getWorkout } from "@app/zustand/hooks";

type ViewWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutViewModal"
>;

const ViewWorkoutModal: FC<ViewWorkoutNavigationProps> = (
  { route, navigation },
) => {
  const { workoutId } = route.params;
  const workout = getWorkout(workoutId);

  return (
    <View>
      <Text>{workout?.name}</Text>
    </View>
  );
};

export default ViewWorkoutModal;

const styles = StyleSheet.create({});
