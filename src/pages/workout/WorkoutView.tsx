import { ScrollView, SectionList, StyleSheet, View } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { createSectionList, DateMapper } from "../../utils/helpers";
import { useWorkout } from "../../zustand/workoutStore";
import WorkoutCard from "../../components/workouts/WorkoutCard";
import StartWorkout from "../../components/workouts/StartWorkout";
import ActiveWorkoutPopup from "../../components/workouts/ActiveWorkoutPopup";

const WorkoutView = () => {
  const workouts = useWorkout((state) => state.workouts);

  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <SectionList
          ListHeaderComponent={() => {
            return (
              <>
                <StartWorkout />

                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.outline }}
                >
                  History
                </Text>
              </>
            );
          }}
          sections={createSectionList(workouts, "started_at", DateMapper)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
          renderSectionHeader={({ section: { title, data } }) => {
            return (
              <View style={styles.historyHeader}>
                <Text>{title}</Text>
                <Text>{data.length} Workouts</Text>
              </View>
            );
          }}
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
  historyHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.5,
  },
});
