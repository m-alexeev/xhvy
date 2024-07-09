import Col from "@app/components/core/grid/Col";
import Row from "@app/components/core/grid/Row";
import { ExerciseTabsScreenProps } from "@app/types/navigation/exercise";
import { HistoricExercise, WorkoutSet } from "@app/types/workouts";
import { brzyckiFormula, epleyFormula } from "@app/utils/formulas";
import { camelCase } from "@app/utils/stringParsers";
import { getExerciseHistory } from "@app/zustand/hooks";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

type ExerciseHistoryNavProps = ExerciseTabsScreenProps<"History">;

interface SetProps {
  set: WorkoutSet;
  index: number;
}
const ExerciseHistoryCard: FC<HistoricExercise> = (exercise) => {
  const { colors } = useTheme();

  const RenderSets: FC<SetProps> = ({ index, set }) => {
    return (
      <Row>
        <Col span={1}>
          <Text>{index}</Text>
        </Col>
        <Col span={2}>
          <Text>{set.reps}</Text>
        </Col>
        <Col span={2}>
          <Text>{set.weight}</Text>
        </Col>
        <Col span={0}>
          <Text>{epleyFormula(set.weight || 0, set.reps || 0)}</Text>
        </Col>
      </Row>
    );
  };

  return (
    <View style={styles(colors).card}>
      <View style={styles().cardHeader}>
        <Text variant="titleMedium">{camelCase(exercise.name)}</Text>
        <Text variant="bodySmall">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(exercise.completedAt)}
        </Text>
      </View>
      <View style={styles().setsContainer}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles().setHeader}>
              <Row>
                <Col span={1}>
                  <Text variant="titleSmall">Set</Text>
                </Col>
                <Col span={2}>
                  <Text variant="titleSmall">Reps</Text>
                </Col>
                <Col span={2}>
                  <Text variant="titleSmall">Weight</Text>
                </Col>
                <Col span={0}>
                  <Text variant="titleSmall">1RM</Text>
                </Col>
              </Row>
            </View>
          )}
          data={exercise.sets}
          renderItem={({ item, index }) => (
            <RenderSets set={item} index={index}></RenderSets>
          )}
          keyExtractor={(item, index) => item.id + index}
        >
        </FlatList>
      </View>
    </View>
  );
};

const ExerciseHistoryScreen: FC<ExerciseHistoryNavProps> = ({ route }) => {
  const { exercise } = route.params;

  const history = getExerciseHistory(exercise.id);

  return (
    <View style={styles().container}>
      <FlatList
        style={styles().list}
        data={history}
        renderItem={({ item, index }) => (
          <ExerciseHistoryCard
            {...item}
          />
        )}
        keyExtractor={(item, index) => item.id + index}
      >
      </FlatList>
    </View>
  );
};

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 5,
    },
    list: {
      flex: 1,
    },
    card: {
      flex: 1,
      backgroundColor: colors?.elevation.level1,
      borderColor: colors?.elevation.level5,
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    cardHeader: {
      flex: 1,
    },
    setsContainer: {
      marginTop: 10,
    },
    setHeader: {
      flex: 1,
      gap: 5,
      marginBottom: 2,
    },
  });

export default ExerciseHistoryScreen;
