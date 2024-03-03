import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation/root";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faFire } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@app/components/core/IconButton";
import { getWorkout } from "@app/zustand/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateDuration } from "@app/utils/helpers";
import { WorkoutExercise } from "@app/types/workouts";
import { camelCase } from "@app/utils/stringParsers";
import { ScrollView } from "react-native-gesture-handler";

type CompleteWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutCompleteModal"
>;

const ExerciseComponent = ({ exercise }: { exercise: WorkoutExercise }) => {
  const { colors } = useTheme();
  return (
    <View
      key={exercise.id}
      style={[exerciseStyles.exerciseContainer, {
        backgroundColor: colors.elevation.level3,
      }]}
    >
      <Text variant="titleSmall">{camelCase(exercise.name)}</Text>
      <View style={exerciseStyles.setContainer}>
        <ScrollView>
          {exercise.sets.map((set, index) => (
            <View
              key={set.id}
              style={{
                flexDirection: "row",
              }}
            >
              <Text variant="bodyMedium">Set {index}</Text>
              <Text style={{ marginLeft: 10 }} variant="bodyMedium">
                {set.reps} x {set.weight}lbs
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const exerciseStyles = StyleSheet.create({
  exerciseContainer: {
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  setContainer: { marginLeft: 10 },
});

const CompleteWorkout: FC<CompleteWorkoutNavigationProps> = ({
  navigation,
  route,
}) => {
  const workout = getWorkout(route.params.workoutId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        <IconButton
          icon={faChevronLeft}
          size={20}
          onPress={() => navigation.replace("HomeStack")}
        />
      </View>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <FontAwesomeIcon icon={faFire} color="#ff8e57" size={32} />
          <Text variant="headlineSmall">Congratulations!</Text>
          <FontAwesomeIcon icon={faFire} color="#ff8e57" size={32} />
        </View>
        <View style={styles.headerBottom}>
          <Text variant="titleMedium">Workout completed</Text>
        </View>
      </View>
      <View style={styles.summmaryContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text variant="bodyMedium" style={{ marginRight: 5 }}>
            Duration:
          </Text>
          <Text variant="bodyMedium">
            {calculateDuration(workout.startedAt, workout.completedAt!)}
          </Text>
        </View>
        {Object.values(workout.exercises).map((exercise) => (
          <ExerciseComponent key={exercise.id} exercise={exercise} />
        ))}
      </View>
      <Button mode="contained" onPress={() => navigation.replace("HomeStack")}>
        Finish
      </Button>
    </SafeAreaView>
  );
};

export default CompleteWorkout;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  back: {
    flexDirection: "row",
  },
  header: {
    marginTop: 150,
    alignItems: "center",
    marginBottom: 20,
  },
  headerTop: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  headerBottom: {},
  summmaryContainer: {},
});
