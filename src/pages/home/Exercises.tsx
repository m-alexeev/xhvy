import { Text, useTheme } from "react-native-paper";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ExerciseStackScreenProps } from "../../types/navigation";
import ExerciseSearch from "../../components/exercises/ExerciseSearch";
import SwipableModal from "../../components/core/SwipableModal";
import ActiveWorkoutPopup from "../../components/workouts/ActiveWorkoutPopup";
import ExerciseList from "../../components/exercises/ExerciseList";

interface IExercisePageProps {
  navigation: ExerciseStackScreenProps<"View">["navigation"];
}

// TODO: Refactor component, Single responsibility principle
// This page should only be responsible for rendering the list of items
// Move the filtering out
const ExercisesScreen: FC<IExercisePageProps> = ({ navigation }) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <View style={{ flex: 1 }}>
      <ExerciseSearch onShowFilter={toggleModal} />
      <View
        style={[styles.container, {
          backgroundColor: theme.colors.background,
        }]}
      >
        <ExerciseList />
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
