import { WorkoutExercise, WorkoutSet } from "@app/types/workouts";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { brzyckiFormula } from "@app/utils/formulas";
import { camelCase } from "@app/utils/stringParsers";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

const WorkoutExerciseCardView = (
  { exercise }: { exercise: WorkoutExercise },
) => {
  const { colors } = useTheme();

  const SetEntry = (
    { set, index }: { set: WorkoutSet; index: number },
  ) => (
    <View key={set.id} style={styles(colors).row}>
      <Text variant="bodyMedium" style={styles(colors).index}>
        {index + 1}
      </Text>
      <Text variant="bodyMedium" style={styles(colors).col}>
        {set.weight}kg x {set.reps}
      </Text>
      {!exercise.tags?.includes("calisthenics") &&
        (
          <Text
            variant="bodyMedium"
            style={[styles(colors).col, { textAlign: "right" }]}
          >
            {brzyckiFormula(set.weight || 0, set.reps || 0)}kg
          </Text>
        )}
    </View>
  );

  return (
    <View style={styles(colors).exerciseContainer}>
      <Text style={styles(colors).exerciseHeader} variant="titleMedium">
        {camelCase(exercise.name)}
      </Text>
      <View style={styles(colors).setContainer}>
        <View style={styles(colors).row}>
          <Text variant="titleSmall" style={styles(colors).indexHeader}>
            Completed Sets
          </Text>
          <Text
            variant="titleSmall"
            style={[styles(colors).col, { textAlign: "right" }]}
          >
            1RM
          </Text>
        </View>
        {exercise.sets.map((item, index) => (
          <SetEntry key={item.id} set={item} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = (colors: MD3Colors) =>
  StyleSheet.create({
    exerciseContainer: {
      backgroundColor: colors.elevation.level2,
      borderRadius: 5,
      padding: 5,
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    exerciseHeader: {
      marginBottom: 5,
    },
    setContainer: { gap: 5 },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    indexHeader: {
      flex: 1,
    },
    index: {
      flex: 1,
      marginRight: 10,
      marginLeft: -3,
      textAlign: "center",
      flexGrow: 0.1,
    },
    col: {
      textAlign: "left",
      flex: 1,
    },
  });

export default WorkoutExerciseCardView;
