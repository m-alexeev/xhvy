import { Text, useTheme } from "react-native-paper";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ExerciseStackScreenProps } from "@app/types/navigation";
import ExerciseSearch from "@app/components/exercises/ExerciseSearch";
import ExerciseList from "@app/components/exercises/ExerciseList";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";
import SwipableModal from "@app/components/core/SwipableModal";

interface IExercisePageProps {
  navigation: ExerciseStackScreenProps<"View">["navigation"];
}

// TODO: Refactor component, Single responsibility principle
// This page should only be responsible for rendering the list of items
// Move the filtering out
const ExercisesScreen: FC<IExercisePageProps> = () => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <View style={{ flex: 1 }}>
      <ExerciseSearch onShowFilter={toggleModal} />
      <ExerciseList />
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
