import { Text } from "react-native-paper";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExerciseSearch from "@app/components/exercises/ExerciseSearch";
import ExerciseList from "@app/components/exercises/ExerciseList";
import ActiveWorkoutPopup from "@app/components/workouts/ActiveWorkoutPopup";
import SwipableModal from "@app/components/core/SwipableModal";
import { ExerciseStackScreenProps } from "@app/types/navigation/exercise";

type ExerciseNavigationProps = ExerciseStackScreenProps<"View">;

const ExercisesScreen: FC<ExerciseNavigationProps> = () => {
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
