import { SectionList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Divider, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { IWorkout, SetType } from "../../types/workouts";
import { createSectionList, DateMapper } from "../../utils/helpers";
import { useWorkout } from "../../zustand/workoutStore";
import WorkoutCard from "../../components/workouts/WorkoutCard";
import StartWorkout from "../../components/workouts/StartWorkout";
import ActiveWorkoutPopup from "../../components/workouts/ActiveWorkoutPopup";

const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 1);
currentDate.setMinutes(currentDate.getMinutes() + 15);
currentDate.setSeconds(currentDate.getSeconds() + 32);
// Define your exercises, sets, and workout
const sampleWorkout: IWorkout[] = [{
  id: "1",
  name: "Full Body Workout",
  exercises: {
    "key1": {
      id: "key1",
      name: "Pushups",
      sets: [],
    }
  },
  started_at: new Date(),
  completed_at: currentDate
}];

createSectionList(sampleWorkout, "started_at", DateMapper);

const WorkoutView = () => {
  const { activeWorkout } = useWorkout();

  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[styles.container, {
          backgroundColor: theme.colors.background,
        }]}
      >
        <View style={styles.newWorkoutContainer}>
          <Text variant="bodySmall" style={{color: theme.colors.outline}}>Quick Links</Text>
          <StartWorkout />
        </View>
        <Text variant="bodySmall" style={{color: theme.colors.outline}}>History</Text>
        <SectionList
          sections={createSectionList(sampleWorkout, "started_at", DateMapper)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
          renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
        />
      </View>
      <ActiveWorkoutPopup />
    </SafeAreaView>
  );
};

export default WorkoutView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  newWorkoutContainer: {
    marginVertical: 5,
  },
  workoutButton: {
    marginBottom: 5,
    borderRadius: 10,
  },
});
