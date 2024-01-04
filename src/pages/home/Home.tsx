import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";
import HomeProfile from "@app/components/home/HomeProfile";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import WeeklyChart from "@app/components/home/WeeklyChart";
import { Text } from "react-native-paper";

const HomeScreen: FC = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <HomeProfile />
        {/* <WeeklyChart /> */}
      </View>
      <ActiveWorkoutPopup />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
