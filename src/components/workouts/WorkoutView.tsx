import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutCard from "./WorkoutCard";
import { IWorkout, SetType } from "../../types/workouts";

const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 2);
currentDate.setMinutes(currentDate.getMinutes() + 15);
currentDate.setSeconds(currentDate.getSeconds() + 32);
// Define your exercises, sets, and workout
const sampleWorkout: IWorkout = {
  id: '1',
  name: 'Full Body Workout',
  exercises: [
    {
      exercise: {
        // Sample exercise details
        id: '1',
        name: 'Squats',
      },
      sets: [
        {
          type: 'R' as SetType, // Reps-based set
          reps: 10,
          weight: 50, // Set weight
        },
        {
          type: 'R' as SetType,
          reps: 8,
          weight: 60,
        },
        {
          type: 'R' as SetType,
          reps: 6,
          weight: 70,
        },
      ],
    },
    {
      exercise: {
        id: '2',
        name: 'Push-ups',
      },
      sets: [
        {
          type: 'R' as SetType,
          reps: 15,
          weight: 0, // Bodyweight exercise
          bodyweight: true,
        },
        {
          type: 'R' as SetType,
          reps: 12,
          weight: 0,
          bodyweight: true,
        },
        {
          type: 'R' as SetType,
          reps: 10,
          weight: 0,
          bodyweight: true,
        },
      ],
    },
  ],
  note: 'Remember to maintain proper form',
  started_at: new Date(), // Workout start time
  completed_at: currentDate, // Workout completion time
};
  


const WorkoutView = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <View
        style={[styles.container, {
          backgroundColor: theme.colors.background,
        }]}
      >
        <Text>Workouts</Text>
        <WorkoutCard workout={sampleWorkout}/>
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
