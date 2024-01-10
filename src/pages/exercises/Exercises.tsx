import { Text } from "react-native-paper";
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

const ExercisesScreen: FC<IExercisePageProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <View style={styles.container}>
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
    flex: 1,
  },
});

export default ExercisesScreen;
