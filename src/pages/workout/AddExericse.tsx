import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import ExerciseSearch from "@app/components/exercises/ExerciseSearch";
import SelectableExerciseList from "@app/components/exercises/SelectableExerciseList";
import { RootStackParamList } from "@app/types/navigation/root";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddMode } from "@app/types/general";

type AddExercisePageNavProps = NativeStackScreenProps<
  RootStackParamList,
  "AddExerciseModal"
>;

const AddExercisePage: FC<AddExercisePageNavProps> = ({ route }) => {
  const mode: AddMode = route.params.mode || "active";
  let id = undefined;
  if (route.params.mode !== "active") {
    id = route.params.id;
  }

  return (
    <View style={styles.container}>
      <ExerciseSearch onShowFilter={() => {}} />
      <SelectableExerciseList mode={mode} id={id} />
    </View>
  );
};

export default AddExercisePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
});
