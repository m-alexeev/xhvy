import { ExerciseTabsScreenProps } from "@app/types/navigation/exercise";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type ExerciseAboutNavProps = ExerciseTabsScreenProps<"About">;

const ExerciseAboutScreen: FC<ExerciseAboutNavProps> = ({ route }) => {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <Text>{exercise.name}</Text>
      <Text>{exercise.instructions}</Text>
      <Text>{exercise.tags}</Text>
      <Text>{exercise.primaryMuscles}</Text>
      <Text>{exercise.primaryMuscleGroups}</Text>
      <Text>{exercise.secondaryMuscles}</Text>
      <Text>{exercise.secondaryMuscleGroups}</Text>
      <Text>{exercise.equipment}</Text>
      <Text>{exercise.type}</Text>
      <Text>{exercise.force}</Text>
      <Text>{exercise.movement}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ExerciseAboutScreen;
