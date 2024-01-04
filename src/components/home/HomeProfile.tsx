import { StyleSheet, View } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useWorkout } from "@app/zustand/workoutStore";

const HomeProfile = () => {
  const { colors } = useTheme();
  const user = auth().currentUser!;
  const workouts = useWorkout((state) => state.workouts);

  const getFirstName = (name: string | null) =>
    name ? name.split(" ")[0] : "";

  const getTimeofDay = () => {
    const time = new Date();
    if (time.getHours() > 4 && time.getHours() < 12) {
      return "Morning";
    }
    if (time.getHours() >= 12 && time.getHours() < 17) {
      return "Afternoon";
    }
    if (time.getHours() > 17 && time.getHours() < 22) {
      return "Evening";
    }
    return "Night";
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text variant="headlineSmall">Good {getTimeofDay()}, </Text>
        <Text variant="headlineSmall" style={{ color: colors.primary }}>
          {getFirstName(user.displayName)}!
        </Text>
      </View>
      <Text variant="labelMedium">{workouts.length} Workouts</Text>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {},
  welcome: {
    flexDirection: "row",
  },
});
