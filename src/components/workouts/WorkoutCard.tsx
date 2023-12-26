import { FC } from "react";
import { IWorkout, IWorkoutExercise } from "../../types/workouts";
import { StyleSheet, View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";
import { calculateDuration } from "../../utils/helpers";

interface WorkoutProps {
  workout: IWorkout;
}

const WorkoutExerciseItem: FC<IWorkoutExercise> = (props) => {
  return (
    <View style={styles.itemContainer}>
      <Text>
        {props.exercise.name} x {props.sets.length}
      </Text>
    </View>
  );
};

interface WorkoutExercisesProps {
  exercises: IWorkoutExercise[];
}
const WorkoutExercises: FC<WorkoutExercisesProps> = ({ exercises }) => {
  return (
    <View>
      {exercises.map((exercise) => (
        <WorkoutExerciseItem key={exercise.exercise.id} {...exercise}>
        </WorkoutExerciseItem>
      ))}
    </View>
  );
};

const WorkoutCard: FC<WorkoutProps> = ({ workout }) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, {
        backgroundColor: theme.colors.surfaceVariant,
      }]}
    >
      <View style={styles.headerContainer}>
        <Text variant="titleMedium">{workout.name}</Text>
        <View style={styles.durationStyle}>
          <Text style={{ marginEnd: 5 }}>
            {calculateDuration(workout.started_at, workout.completed_at!)}
          </Text>
          <Icon size={16} source="clock" />
        </View>
      </View>
      <View style={styles.exerciseContainer}>
        <Text variant="titleSmall">Exercises</Text>
        <WorkoutExercises exercises={workout.exercises} />
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
