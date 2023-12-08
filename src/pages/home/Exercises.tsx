import { Button, Text } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { exerciseList } from "../../utils/exercises";
import ExerciseListItem from "../../components/exercises/exerciseItem";

const ExercisesScreen: FC = ({}) => {
  const { theme } = useTheme();

  const handleDelete = (id: number) => {
    console.log(id);
  }

  return (
    <SafeAreaView>
      <View
        style={[styles.container, {
          backgroundColor: theme.colors.background,
        }]}
      >
        <Text h4>Exercises</Text>
        <Button>Create Exercise</Button>
        <View style={{ backgroundColor: theme.colors.background }}>
          {exerciseList.map((exercise, index) => {
            return <ExerciseListItem key={index} exercise={exercise} handleDelete={handleDelete}/>;
          })}
        </View>
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
