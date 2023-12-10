import { Button, Text } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { exerciseList } from "../../utils/exercises";
import ExerciseListItem from "../../components/exercises/exerciseItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ExerciseStackParamList } from "../../types/navigation";

type ExercisesScreenProp = NativeStackScreenProps<
  ExerciseStackParamList,
  "View"
>;

interface IExercisePageProps {
  navigation: ExercisesScreenProp["navigation"];
}

const ExercisesScreen: FC<IExercisePageProps> = ({ navigation }) => {
  const { theme } = useTheme();

  const handleDelete = (id: number) => {
    console.log(id);
    // TODO: create a delete exercise popup
  };

  const handleEdit = (id: number) => {
    console.log(id);
    //TODO: navigate to edit page / make a popup
  };

  return (
    <SafeAreaView>
      <View
        style={[styles.container, {
          backgroundColor: theme.colors.background,
        }]}
      >
        <Text h4>Exercises</Text>
        <View style={{ backgroundColor: theme.colors.background }}>
          <FlatList
            data={exerciseList}
            renderItem={({ item }) => (
              <ExerciseListItem
                onPress={() =>
                  navigation.navigate("Details", {
                    exercise_id: item.id.toString(),
                  })}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                exercise={item}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <Button containerStyle={{ marginTop: 10 }} title="Create Exercises">
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default ExercisesScreen;
