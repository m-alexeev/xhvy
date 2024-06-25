import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { useWorkout } from "@app/zustand/workoutStore";
import { calculateDuration } from "@app/utils/helpers";
import IconButton from "@app/components/core/IconButton";
import {
  Workout,
  WorkoutExercise,
  WorkoutExercises,
} from "@app/types/workouts";
import { useNavigation } from "@react-navigation/native";
import { camelCase } from "@app/utils/stringParsers";
import { RootStackNavigationProp } from "@app/types/navigation/root";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ConfirmationButton from "../core/ConfirmationButton";

interface WorkoutProps {
  workout: Workout;
}

const WorkoutExerciseItem: FC<WorkoutExercise> = (props) => {
  return (
    <View style={styles.itemContainer}>
      <Text variant="bodySmall">
        {camelCase(props.name)} x {props.sets.length}
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
  const navigation = useNavigation<RootStackNavigationProp>();
  const theme = useTheme();
  const deleteWorkout = useWorkout((state) => state.deleteWorkout);

  return (
    <View>
      <TouchableRipple
        borderless
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.elevation.level4,
          },
        ]}
        onPress={() =>
          navigation.navigate("WorkoutViewModal", { workoutId: workout.id })}
      >
        <View>
          <View style={styles.headerContainer}>
            <Text variant="titleMedium">{workout.name}</Text>
            <View style={styles.durationStyle}>
              <Text style={{ marginEnd: 5 }}>
                {calculateDuration(workout.startedAt, workout.completedAt!)}
              </Text>
              <FontAwesomeIcon icon={faClock} color={theme.colors.onSurface} />
              <ConfirmationButton
                variant="icon"
                popupText="Are you sure you want to delete this workout?"
                onConfirm={() => deleteWorkout(workout.id)}
                icon={faTrash}
                size={16}
                color={theme.colors.onErrorContainer}
              >
              </ConfirmationButton>
            </View>
          </View>
          <Text variant="bodySmall">{workout.startedAt.toLocaleString()}</Text>
          <View style={styles.exerciseContainer}>
            <Text variant="titleSmall">Exercises</Text>
            <WorkoutCardExercises exercises={workout.exercises} />
          </View>
        </View>
      </TouchableRipple>
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
