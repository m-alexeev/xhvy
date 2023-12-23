import { SectionList, StyleSheet, View } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutCard from "./WorkoutCard";
import { IWorkout, SetType } from "../../types/workouts";
import { createSectionList, DateMapper } from "../../utils/helpers";

const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 1);
currentDate.setMinutes(currentDate.getMinutes() + 15);
currentDate.setSeconds(currentDate.getSeconds() + 32);
// Define your exercises, sets, and workout
const sampleWorkout: IWorkout[] = [{
  id: "1",
  name: "Full Body Workout",
  exercises: [
    {
      exercise: {
        // Sample exercise details
        id: "1",
        name: "Squats",
        // ... other exercise properties
      },
      sets: [
        {
          type: "R" as SetType, // Reps-based set
          reps: 10,
          weight: 50, // Set weight
        },
        {
          type: "R" as SetType,
          reps: 8,
          weight: 60,
        },
        {
          type: "R" as SetType,
          reps: 6,
          weight: 70,
        },
      ],
    },
    {
      exercise: {
        id: "2",
        name: "Push-ups",
        // ... other exercise properties
      },
      sets: [
        {
          type: "R" as SetType,
          reps: 15,
          weight: 0, // Bodyweight exercise
          bodyweight: true,
        },
        {
          type: "R" as SetType,
          reps: 12,
          weight: 0,
          bodyweight: true,
        },
        {
          type: "R" as SetType,
          reps: 10,
          weight: 0,
          bodyweight: true,
        },
      ],
    },
  ],
  started_at: new Date(), // Workout start time
  completed_at: currentDate, // Workout completion time
}, {
  id: "2",
  name: "Workout 2",
  exercises: [
    {
      exercise: {
        // Sample exercise details
        id: "1",
        name: "Squats",
        // ... other exercise properties
      },
      sets: [
        {
          type: "R" as SetType, // Reps-based set
          reps: 10,
          weight: 50, // Set weight
        },
        {
          type: "R" as SetType,
          reps: 8,
          weight: 60,
        },
        {
          type: "R" as SetType,
          reps: 6,
          weight: 70,
        },
      ],
    },
    {
      exercise: {
        id: "2",
        name: "Push-ups",
        // ... other exercise properties
      },
      sets: [
        {
          type: "R" as SetType,
          reps: 15,
          weight: 0, // Bodyweight exercise
          bodyweight: true,
        },
        {
          type: "R" as SetType,
          reps: 12,
          weight: 0,
          bodyweight: true,
        },
        {
          type: "R" as SetType,
          reps: 10,
          weight: 0,
          bodyweight: true,
        },
      ],
    },
  ],
  started_at: new Date(), // Workout start time
  completed_at: currentDate, // Workout completion time
}, {
  id: "3",
  name: "Workout 3",
  exercises: [
    {
      exercise: {
        // Sample exercise details
        id: "1",
        name: "Squats",
        // ... other exercise properties
      },
      sets: [
        {
          type: "R" as SetType, // Reps-based set
          reps: 10,
          weight: 50, // Set weight
        },
        {
          type: "R" as SetType,
          reps: 8,
          weight: 60,
        },
        {
          type: "R" as SetType,
          reps: 6,
          weight: 70,
        },
      ],
    },
    {
      exercise: {
        id: "2",
        name: "Push-ups",
        // ... other exercise properties
      },
      sets: [
        {
          type: "R" as SetType,
          reps: 15,
          weight: 0, // Bodyweight exercise
          bodyweight: true,
        },
        {
          type: "R" as SetType,
          reps: 12,
          weight: 0,
          bodyweight: true,
        },
        {
          type: "R" as SetType,
          reps: 10,
          weight: 0,
          bodyweight: true,
        },
      ],
    },
  ],
  started_at: currentDate, // Workout start time
  completed_at: currentDate, // Workout completion time
}];

createSectionList(sampleWorkout, "started_at", DateMapper);

const WorkoutView = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <View
        style={[styles.container, {
          backgroundColor: theme.colors.background,
        }]}
      >
        <Text variant="titleLarge">Past Workouts</Text>
        <SectionList
          sections={createSectionList(sampleWorkout, "started_at", DateMapper)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
          renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkoutView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
