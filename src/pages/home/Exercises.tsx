import { Text, useTheme } from "react-native-paper";
import { FC, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ExerciseStackParamList,
  RootStackParamList,
} from "../../types/navigation";
import { ExerciseStore } from "../../zustand/exerciseStore";
import ExerciseSearch from "../../components/exercises/ExerciseSearch";
import { useFilter } from "../../zustand/filterStore";
import SwipableModal from "../../components/core/SwipableModal";
import ExerciseListItem from "../../components/exercises/SwipableExerciseItem";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createSectionList, FirstLetterMapper } from "../../utils/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveWorkoutPopup from "../../components/workouts/ActiveWorkoutPopup";

type ExercisesScreenProp = CompositeScreenProps<
  BottomTabScreenProps<ExerciseStackParamList, "View">,
  NativeStackScreenProps<RootStackParamList>
>;

interface IExercisePageProps {
  navigation: ExercisesScreenProp["navigation"];
}

// TODO: Refactor component, Single responsibility principle
// This page should only be responsible for rendering the list of items
// Move the filtering out
const ExercisesScreen: FC<IExercisePageProps> = ({ navigation }) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const { search } = useFilter();
  const exercises = ExerciseStore((state) => (state.exercises));

  const toggleModal = () => setShowModal(!showModal);

  //TODO: useMemo probably
  const filteredExercises = exercises.filter((
    exercise,
  ) => (exercise.name.toLowerCase().includes(search.trim().toLowerCase())));

  return (
    <View style={{ flex: 1 }}>
      <ExerciseSearch onShowFilter={toggleModal} />
      <View
        style={[styles.container, {
          backgroundColor: theme.colors.background,
        }]}
      >
        <SectionList
          sections={createSectionList(
            filteredExercises,
            "name",
            FirstLetterMapper,
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseListItem
              onPress={() =>
                navigation.navigate("Details", { exercise_id: item.id })}
              exercise={item}
              swipable={!!item.modifiable}
            />
          )}
          renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
        />
      </View>
      <ActiveWorkoutPopup />
      <SwipableModal visible={showModal} toggleModal={toggleModal}>
        <Text>Filters</Text>
      </SwipableModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "column",
  },
});

export default ExercisesScreen;
