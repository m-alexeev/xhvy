import { FC } from "react";
import { IWorkout } from "../../types/workouts";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { calculateDuration } from "../../utils/helpers";

interface WorkoutProps {
  workout: IWorkout;
}

const WorkoutCard: FC<WorkoutProps> = ({ workout }) => {
  return (
    <Card mode="contained">
      <View>
        <View>
          <Text>{workout.name}</Text>
          <Text>{calculateDuration(workout.started_at, workout.completed_at)}</Text>
        </View>
        
      </View>
    </Card>
  );
};

export default WorkoutCard;
