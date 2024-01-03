import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { useWorkout } from "@app/zustand/workoutStore";
import { calculateDuration } from "@app/utils/helpers";
import IconButton from "@app/components/core/IconButton";
import {
  IWorkout,
  IWorkoutExercise,
  WorkoutExercises,
} from "@app/types/workouts";

interface WorkoutProps {
  workout: IWorkout;
}

const WorkoutExerciseItem: FC<IWorkoutExercise> = (props) => {
  return (
    <View style={styles.itemContainer}>
      <Text>
        {props.name} x {props.sets.length}
      </Text>
    </View>
  );
};

interface WorkoutExercisesProps {
  exercises: WorkoutExercises;
}
const WorkoutCardExercises: FC<WorkoutExercisesProps> = ({ exercises }) => {
  return (
    <View>
      {Object.keys(exercises).map((id) => (
        <WorkoutExerciseItem key={id} {...exercises[id]}></WorkoutExerciseItem>
      ))}
    </View>
  );
};

const WorkoutCard: FC<WorkoutProps> = ({ workout }) => {
  const theme = useTheme();
  const deleteWorkout = useWorkout((state) => state.deleteWorkout);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceVariant,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text variant="titleMedium">{workout.name}</Text>
        <View style={styles.durationStyle}>
          <Text style={{ marginEnd: 5 }}>
            {calculateDuration(workout.started_at, workout.completed_at!)}
          </Text>
          <Icon size={16} source="clock" />
          <IconButton
            onPress={() => deleteWorkout(workout.id)}
            icon={"delete-outline"}
            color={theme.colors.onErrorContainer}
          ></IconButton>
        </View>
      </View>
      <View style={styles.exerciseContainer}>
        <Text variant="titleSmall">Exercises</Text>
        <WorkoutCardExercises exercises={workout.exercises} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  exerciseContainer: {},
  itemContainer: {
    marginLeft: 15,
  },
});

export default WorkoutCard;
