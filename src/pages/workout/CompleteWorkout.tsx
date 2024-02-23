import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React, { FC, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation/root";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faFire } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@app/components/core/IconButton";
import { useWorkout } from "@app/zustand/workoutStore";
import { getWorkout } from "@app/zustand/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

type CompleteWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutCompleteModal"
>;
const CompleteWorkout: FC<CompleteWorkoutNavigationProps> = ({
  navigation,
  route
}) => {
  const saveWorkout = useWorkout((state) => state.saveActiveWorkout);

  const workout = getWorkout(route.params.workoutId);


  useEffect(() => {
    saveWorkout();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        <IconButton icon={faChevronLeft} size={20} onPress={() => navigation.replace("HomeStack")}/>
      </View>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <FontAwesomeIcon icon={faFire} color="#ff8e57" size={32}/>
          <Text variant="headlineSmall">Congratulations!</Text>
          <FontAwesomeIcon icon={faFire} color="#ff8e57" size={32}/>
        </View>
        <View style={styles.headerBottom}>
          <Text variant="bodyMedium">Workout completed</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteWorkout;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  back: {
    flexDirection: "row",
  },
  header: {
    alignItems: 'center',
  },
  headerTop: { 
    gap: 5,
    flexDirection: "row",
    alignItems: 'center',
  },
  headerBottom: {},
});
