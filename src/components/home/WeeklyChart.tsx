import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useWorkout } from "@app/zustand/workoutStore";
import XhvyBarChart from "../charts/BarChart";
import { chartConfig } from "../charts/base";
import { createWeeklyList } from "@app/utils/helpers";
import { values } from "lodash";

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

  const sampleData = [3, 4, 2, 5, 4, 5, 4];

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <XhvyBarChart
        data={{
          labels: [...Object.keys(weeklyWorkouts)],
          datasets: [{
            data: [
              ...Object.values(weeklyWorkouts).map((values) => values.length),
            ],
          }],
        }}
        yAxisLabel=""
        yAxisSuffix=""
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={chartConfig}
        withInnerLines={false}
      />
    </View>
  );
};

export default WeeklyChart;

const styles = StyleSheet.create({});
