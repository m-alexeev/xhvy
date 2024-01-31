import { Exercise } from "@app/types/exercises";
import { ExerciseTabsScreenProps } from "@app/types/navigation/exercise";
import { camelCase } from "@app/utils/stringParsers";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAtom,
  faDumbbell,
  faHandRock,
  faPersonWalking,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

type ExerciseAboutNavProps = ExerciseTabsScreenProps<"About">;

const ExerciseDetailCard = <T extends keyof Exercise>(
  { label, item, icon }: { label: string; item: Exercise[T]; icon: IconProp },
) => {
  const { colors } = useTheme();

  if (item === undefined || Array.isArray(item) && item.length === 0) {
    return;
  }
  const windowDimensions = Dimensions.get("window");

  // Some voodoo math to get these centered and the same size
  // Should test on other displays
  return (
    <View
      style={[cardStyles(colors).container, {
        width: (windowDimensions.width - 25) / 2,
      }]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text variant="titleSmall">{label}</Text>
        <FontAwesomeIcon icon={icon} size={16} color={colors.onSurface} />
      </View>
      {Array.isArray(item)
        ? <Text variant="bodySmall">{camelCase(item.join(", "))}</Text>
        : <Text variant="bodySmall">{camelCase(item!.toString())}</Text>}
    </View>
  );
};

const cardStyles = (colors?: MD3Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors?.elevation.level4,
      padding: 10,
      borderRadius: 10,
    },
  });

const ExerciseAboutScreen: FC<ExerciseAboutNavProps> = ({ route }) => {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text variant="titleMedium">{camelCase(exercise.name)}</Text>
      </View>
      <View>
      </View>
      <View style={styles.muscleTable}>
        <ExerciseDetailCard label="Tags" item={exercise.tags} icon={faTag} />
        <ExerciseDetailCard
          label="Equipment"
          item={exercise.equipment}
          icon={faDumbbell}
        />
        <ExerciseDetailCard label="Type" item={exercise.type} icon={faAtom} />
        <ExerciseDetailCard
          label="Force"
          item={exercise.force}
          icon={faHandRock}
        />
        <ExerciseDetailCard
          label="Movement"
          item={exercise.movement}
          icon={faPersonWalking}
        />
      </View>
      <View>
        <Text variant="titleSmall">Instructions</Text>
        <Text variant="bodySmall">{exercise.instructions}</Text>
      </View>
    </View>
  );
};

// <ExerciseDetailCard
//   label="Primary Muscle Groups"
//   item={exercise.primaryMuscles}
// />
// <ExerciseDetailCard
//   label="Primary Muscles"
//   item={exercise.primaryMuscles}
// />
// <ExerciseDetailCard
//   label="Secondary Muscle Groups"
//   item={exercise.secondaryMuscleGroups}
// />
// <ExerciseDetailCard
//   label="Secondary Muscles"
//   item={exercise.secondaryMuscles}
// />
const styles = StyleSheet.create({
  container: { margin: 10, flex: 1 },
  title: {},
  muscleTable: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginVertical: 10,
  },
});

export default ExerciseAboutScreen;
