import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useWorkout } from "@app/zustand/workoutStore";
import { AreaChart, Grid, LineChart, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";

const WeeklyChart = () => {
  const workouts = useWorkout((state) => state.workouts);

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

  const sampleData = [3, 4, 2, 5, 4, 5, 4];

  return (
    <View>
      <AreaChart
        data={sampleData}
        style={{ height: 200 }}
        contentInset={{ top: 30, bottom: 30, left: -2, right: -2 }}
        curve={shape.curveNatural}
        svg={{
          stroke: "rgba(134, 65, 244, 0.8)",
          fill: "rgba(134, 65, 244, 0.3)",
          strokeWidth: 4,
        }}
      >
        <Grid />
      </AreaChart>

      <XAxis data={sampleData}></XAxis>
    </View>
  );
};

export default WeeklyChart;

const styles = StyleSheet.create({});
