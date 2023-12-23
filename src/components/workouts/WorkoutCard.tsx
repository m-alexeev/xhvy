import { FC } from "react";
import { IWorkout } from "../../types/workouts";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { calculateDuration } from "../../utils/helpers";

interface WorkoutProps {
  workout: IWorkout;
}

const WorkoutCard: FC<WorkoutProps> = ({ workout }) => {
  return (
    <Card style={styles.container} mode="contained">
      <View>
        <View>
          <Text>{workout.name}</Text>
          <Text>
            {calculateDuration(workout.started_at, workout.completed_at)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 5, paddingHorizontal: 10, marginVertical:5 },
});

export default WorkoutCard;
