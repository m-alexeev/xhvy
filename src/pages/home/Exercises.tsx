import {  useTheme } from "react-native-paper";
import { FC,  } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExerciseListItem from "../../components/exercises/exerciseItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../../types/navigation";
import { ExerciseStore } from "../../zustand/exerciseStore";
import ExerciseSearch from "../../components/exercises/exerciseSearch";

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

  const handleDelete = (id: number) => {
    console.log(id);
    // TODO: create a delete exercise popup
  };

  const handleEdit = (id: number) => {
    console.log(id);
    //TODO: navigate to edit page / make a popup
  };

  return (
    <View
      style={[styles.container, {
        backgroundColor: theme.colors.background,
      }]}
    >
      <ExerciseSearch/>
      <FlatList
        data={exercises}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
  },

});

export default ExercisesScreen;
