import { formatTime } from "@app/utils/helpers";
import { useWorkout } from "@app/zustand/workoutStore";
import { FC, useEffect, useState } from "react";
import { Text, TextProps } from "react-native-paper";

interface WorkoutDurationProps extends Omit<TextProps<Text>, "children"> {}

const WorkoutDuration: FC<WorkoutDurationProps> = (props) => {
  const activeWorkout = useWorkout((state) => state.activeWorkout);
  const [duration, setDuration] = useState(0);
  
  const updateDuration = () => {
    if (activeWorkout) {
      const parsedStartDate = new Date(activeWorkout.startedAt);
      setDuration((new Date().getTime() - parsedStartDate.getTime()) / 1000);
    }
  };

  useEffect(() => {
    // Initial call to set timer 
    updateDuration();
    const interval = setInterval(updateDuration, 1000);
    return () => clearInterval(interval);
  }, []);

  return <Text {...props}>{formatTime(duration)}</Text>;
};


export default WorkoutDuration;
