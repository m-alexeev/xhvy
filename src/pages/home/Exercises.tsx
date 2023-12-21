import { Divider, Text, useTheme } from "react-native-paper";
import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ExerciseListItem from "../../components/exercises/ExerciseItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../../types/navigation";
import { ExerciseStore } from "../../zustand/exerciseStore";
import ExerciseSearch from "../../components/exercises/ExerciseSearch";
import Modal from "react-native-modal";
import { useFilter } from "../../zustand/filterStore";

type ExercisesScreenProp = NativeStackScreenProps<
  ExerciseStackParamList,
  "View"
>;

interface IExercisePageProps {
  navigation: ExercisesScreenProp["navigation"];
}

// TODO: Refactor component, Single responsibility principle
// This page should only be responsible for rendering the list of items
const ExercisesScreen: FC<IExercisePageProps> = ({ navigation }) => {
  const theme = useTheme();
  const exercises = ExerciseStore((state) => (state.exercises));
  const [showModal, setShowModal] = useState(false);
  const { search } = useFilter();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (id: number) => {
    console.log(id);
    // TODO: create a delete exercise popup
  };

  const handleEdit = (id: number) => {
    console.log(id);
    //TODO: navigate to edit page / make a popup
  };

  //TODO: useMemo probably
  const filteredExercises = exercises.filter((
    exercise,
  ) => (exercise.name.toLowerCase().includes(search.trim().toLowerCase())));

  return (
    <View
      style={[styles.container, {
        backgroundColor: theme.colors.background,
      }]}
    >
      <ExerciseSearch onShowFilter={toggleModal} />
      <FlatList
        data={filteredExercises || []}
        windowSize={5}
        initialNumToRender={20}
        renderItem={({ item }) => (
          <ExerciseListItem
            onPress={() =>
              navigation.navigate("Details", {
                exercise_id: item.id,
              })}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            exercise={item}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item) => item.id.toString()}
      />
      {/*Create a modal component out of this */}
      <Modal
        isVisible={showModal}
        onDismiss={toggleModal}
        onBackdropPress={toggleModal}
        swipeThreshold={50}
        coverScreen={false}
        useNativeDriverForBackdrop
        onSwipeComplete={toggleModal}
        swipeDirection={["down"]}
        backdropColor={theme.colors.surface}
        style={styles.modal}
      >
        <View
          style={[styles.modalContainer, {
            backgroundColor: theme.colors.secondaryContainer,
          }]}
        >
          <View
            style={[styles.modalDragger, {
              backgroundColor: theme.colors.onSecondaryContainer,
            }]}
          >
          </View>
          <View style={styles.modalContent}>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "column",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    opacity: 1,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalDragger: {
    alignSelf: "center",
    width: 90,
    height: 3,
    borderRadius: 2,
  },
  modalContent: {},
});

export default ExercisesScreen;
