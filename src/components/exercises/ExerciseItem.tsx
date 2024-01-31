import { StyleSheet, View } from "react-native";
import { FC, memo } from "react";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { Exercise } from "@app/types/exercises";
import { camelCase } from "@app/utils/stringParsers";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface SelectableExerciseProps {
  mode: "select";
  selected: boolean;
}

interface LinkExerciseProps {
  mode: "link";
}
interface GeneralExerciseProps {
  exercise: Exercise;
  handlePress: (exercise: Exercise) => void;
}

type ExerciseItemProps =
  & GeneralExerciseProps
  & (SelectableExerciseProps | LinkExerciseProps);

const ExerciseItem: FC<ExerciseItemProps> = (props) => {
  let selected = undefined;
  const { exercise, mode, handlePress } = props;

  if (mode === "select") {
    selected = props.selected;
  }

  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, {
        backgroundColor: selected ? colors.surfaceVariant : colors.background,
      }]}
    >
      <TouchableRipple
        style={[styles.touchable]}
        onPress={() => handlePress(exercise)}
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
          {selected && (
            <View style={styles.iconContainer}>
              <FontAwesomeIcon
                size={24}
                icon={faCheck}
                color={colors.primary}
              />
            </View>
          )}
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
    justifyContent: "space-between",
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
  iconContainer: {
    marginRight: 10,
  },
});
export default memo(ExerciseItem);
