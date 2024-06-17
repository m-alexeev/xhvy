import { StyleSheet, View } from "react-native";
import React from "react";
import { useWorkout } from "@app/zustand/workoutStore";
import { createWeeklyList } from "@app/utils/helpers";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const WeeklyChart = () => {
  const workouts = useWorkout((state) => state.workouts);

  // TODO: Get past month from today
  const filterWorkouts = () => {
    // Get last 4 weeks of workouts
    const today = new Date();
    const startDay = new Date(); //Will be monday of the week 1 month ago
    startDay.setMonth(today.getMonth() - 4);
    var day = startDay.getDay() || 7; // Get current day number, converting Sun. to 7
    if (day !== 1) { // Only manipulate the date if it isn't Mon.
      startDay.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
    }

    // Get workouts for this past week
    const filteredWorkouts = Object.values(workouts).filter((workout) => {
      return workout.startedAt >= startDay;
    });

    return filteredWorkouts;
  };
  // Map by date, use section mapper?
  const weeklyWorkouts = createWeeklyList(filterWorkouts());
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
};

export default WeeklyChart;

const styles = StyleSheet.create({});
