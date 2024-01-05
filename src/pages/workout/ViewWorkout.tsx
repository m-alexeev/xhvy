import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation";
import { Text } from "react-native-paper";
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

  if (!workout) {
    return (
      <View>
        <Text>Workout does not exist</Text>
      </View>
    );
  }

  console.log(workout.exercises);

  return (
    <View>
      <Text variant="bodyLarge">{workout.name}</Text>
      <View>
        {Object.values(workout.exercises).map((e, i) => (
          <View key={i}>
            <Text>
              {e.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ViewWorkoutModal;

const styles = StyleSheet.create({});
