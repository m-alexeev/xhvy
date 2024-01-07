import { StyleSheet, TextInput, View } from "react-native";
import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@app/types/navigation";
import { getWorkout } from "@app/zustand/hooks";
import { Button, Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import WorkoutExerciseCardList from "@app/components/workouts/workoutExercise/WorkoutExerciseCardList";

type EditWorkoutNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "WorkoutEditModal"
>;

//NOTE: Try to pass whole object instead of id and fetch
//and check performance
const WorkoutEditModal: FC<EditWorkoutNavigationProps> = ({ route }) => {
  const { colors } = useTheme();
  const { workoutId } = route.params;
  const workout = getWorkout(workoutId);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles(colors).container}>
          <View style={styles(colors).header}>
            <TextInput
              style={styles(colors).workoutTitle}
              value={workout?.name}
            />
            <Text>{workout?.note}</Text>
            <Text>{workout!.started_at.toLocaleString()}</Text>
            <Text>{workout!.completed_at!.toLocaleString()}</Text>
          </View>
          <WorkoutExerciseCardList exercises={workout!.exercises}/>
          <Button>Save Changes</Button> 
          <Button textColor={colors.error}>Cancel</Button> 
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkoutEditModal;

const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: { flex: 1, margin: 10 },
    header: { marginBottom: 10 },
    workoutTitle: {
      fontSize: 24,
      color: colors.onSurface,
    },
  });
