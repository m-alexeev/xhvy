import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

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
