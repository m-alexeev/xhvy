import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useWorkout } from "@app/zustand/workoutStore";
import { AreaChart, Grid, LineChart, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { createSectionList, WeekMapper } from "@app/utils/helpers";

const WeeklyChart = () => {
  const workouts = useWorkout((state) => state.workouts);

  const test = createSectionList(workouts, "started_at", WeekMapper);

  //TODO: filter workouts for past month, create section list, group by week, display

  // TODO: Get past month from today
  const filterWorkouts = () => {
    // Get first monday of week
    const today = new Date();
    let mondayOfWeek = new Date();
    mondayOfWeek.setDate(today.getDate() - today.getDay());
    mondayOfWeek.setUTCHours(0, 0, 0, 0);
    // Get workouts for this past week
    return workouts.filter((workout) => {
      workout.started_at >= mondayOfWeek;
    });
  };
  // Map by date, use section mapper?

  return (
    <View>
    </View>
  );
};

export default WeeklyChart;

const styles = StyleSheet.create({});
