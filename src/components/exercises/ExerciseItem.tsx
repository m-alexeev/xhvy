import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { FC, memo } from "react";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { IExercise } from "@app/types/exercises";
import { camelCase } from "@app/utils/stringParsers";
import { useExercise } from "@app/zustand/exerciseStore";
import { useNavigation } from "@react-navigation/native";
import { ExerciseDetailsTabProps } from "@app/types/navigation";

interface ExerciseItemProps {
  exercise: IExercise;
  selectable: boolean;
}

const ExerciseItem: FC<ExerciseItemProps> = (
  { exercise, selectable },
) => {
  const { colors } = useTheme();
  const navigation = useNavigation<ExerciseDetailsTabProps>();
  const selectedExercises = useExercise((s) => s.selectedExercises);
  const toggleExercise = useExercise((s) => s.toggleExercise);

  const handlePress = () => {
    if (selectable) {
      toggleExercise(exercise);
    } else {
      navigation.navigate("Details", { exercise_id: exercise.id });
    }
  };
  //NOTE: Add images after optimizing them
  // <Image
  //   style={[styles.img, { overlayColor: colors.background }]}
  //   source={EXERCISE_GIFS["id"]}
  // >
  // </Image>
  return (
    <View
      style={[styles.container, {
        backgroundColor: selectedExercises.find((e) => e.id === exercise.id)
          ? colors.surfaceVariant
          : colors.background,
      }]}
    >
      <TouchableRipple
        style={[styles.touchable]}
        onPress={handlePress}
        underlayColor={colors.secondaryContainer}
        borderless
      >
        <View style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Text variant="titleSmall">
              {camelCase(exercise.name)}
            </Text>
            {exercise.primaryMuscleGroups && (
              <Text style={{ opacity: 0.7 }}>
                {camelCase(exercise.primaryMuscleGroups.toString(), ",", ", ")}
              </Text>
            )}
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, borderRadius: 10, marginTop: 5 },

  touchable: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    overflow: "hidden",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 56,
    height: 56,
    resizeMode: "contain",
    borderRadius: 50,
    overflow: "hidden",
  },
  textContainer: {
    marginLeft: 10,
  },
});
export default memo(ExerciseItem);
