import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";

const Templates = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Templates</Text>
      </View>
      <ActiveWorkoutPopup />
    </SafeAreaView>
  );
};

export default Templates;

const styles = StyleSheet.create({});
