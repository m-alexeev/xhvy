import { Divider, Text, useTheme } from "react-native-paper";
import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ExerciseListItem from "../../components/exercises/ExerciseItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ExerciseStackParamList,
  RootStackParamList,
} from "../../types/navigation";
import { ExerciseStore } from "../../zustand/exerciseStore";
import ExerciseSearch from "../../components/exercises/ExerciseSearch";
import { useFilter } from "../../zustand/filterStore";
import SwipableModal from "../../components/core/SwipableModal";
import SwipableExerciseListItem from "../../components/exercises/SwipableExerciseItem";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type ExercisesScreenProp = CompositeScreenProps<
  BottomTabScreenProps<ExerciseStackParamList, "View">,
  NativeStackScreenProps<RootStackParamList>
>;

interface IExercisePageProps {
  navigation: ExercisesScreenProp["navigation"];
}

// TODO: Refactor component, Single responsibility principle
// This page should only be responsible for rendering the list of items
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
    <View
      style={[styles.container, {
        backgroundColor: theme.colors.background,
      }]}
    >
      <ExerciseSearch onShowFilter={toggleModal} />
      <FlatList
        data={filteredExercises}
        windowSize={5}
        initialNumToRender={20}
        renderItem={({ item }) => {
          if (item.modifiable) {
            return (
              <SwipableExerciseListItem
                onPress={() =>
                  navigation.navigate("Details", { exercise_id: item.id })}
                exercise={item}
              />
            );
          }
          return (
            <ExerciseListItem
              onPress={() =>
                navigation.navigate("Details", {
                  exercise_id: item.id,
                })}
              exercise={item}
            />
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item) => item.id.toString()}
      />
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
