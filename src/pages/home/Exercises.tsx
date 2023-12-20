import { Text, useTheme } from "react-native-paper";
import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ExerciseListItem from "../../components/exercises/exerciseItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../../types/navigation";
import { ExerciseStore } from "../../zustand/exerciseStore";
import ExerciseSearch from "../../components/exercises/exerciseSearch";
import Modal from "react-native-modal";
import { useFilter } from "../../zustand/filterStore";

type ExercisesScreenProp = NativeStackScreenProps<
  ExerciseStackParamList,
  "View"
>;

interface IExercisePageProps {
  navigation: ExercisesScreenProp["navigation"];
}

const ExercisesScreen: FC<IExercisePageProps> = ({ navigation }) => {
  const theme = useTheme();
  const exercises = ExerciseStore((state) => (state.exercises));
  const [filteredExercises, setFilteredExercises] = useState(exercises);
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

  // useMemo
  useEffect(() => {
    if (search.length === 0) {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(() =>
        exercises.filter((
          exercise,
        ) => (exercise.name.toLowerCase().includes(search.toLowerCase())))
      );
    }
  }, [search]);

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
        renderItem={({ item, index }) => (
          <ExerciseListItem
            onPress={() =>
              navigation.navigate("Details", {
                exercise_id: item.id,
              })}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            exercise={item}
            divider={index != exercises.length - 1}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
