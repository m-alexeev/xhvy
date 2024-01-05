import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";
import HomeProfile from "@app/components/home/HomeProfile";

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
