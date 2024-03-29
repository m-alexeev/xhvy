import { RootStack } from "./stacks";
import WorkoutCreate from "@app/pages/workout/WorkoutCreate";
import Header from "@app/components/core/Header";
import GoBackButton from "@app/components/core/buttons/GoBackButton";
import WorkoutCompleteButton from "@app/components/workouts/buttons/WorkoutCompleteButton";
import ViewWorkoutModal from "@app/pages/workout/ViewWorkout";
import WorkoutEditModal from "@app/pages/workout/WorkoutEditModal";
import AddExercisePage from "@app/pages/modals/AddExercise";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@app/types/navigation/root";
import CompleteWorkout from "@app/pages/workout/CompleteWorkout";

export const ModalGroup = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <>
      <RootStack.Screen
        name="WorkoutCompleteModal"
        component={CompleteWorkout}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="WorkoutCreateModal"
        component={WorkoutCreate}
        options={{
          header: () => (
            <Header
              backButton={<GoBackButton size={24} />}
            >
              <WorkoutCompleteButton />
            </Header>
          ),
        }}
      />
      <RootStack.Screen
        name="WorkoutViewModal"
        component={ViewWorkoutModal}
        options={{
          header: () => (
            <Header
              title="View Workout"
              backButton={<GoBackButton size={24} />}
            >
            </Header>
          ),
        }}
      />
      <RootStack.Screen
        name="WorkoutEditModal"
        component={WorkoutEditModal}
        options={{
          header: () => (
            <Header
              title="Editing Workout"
              backButton={<GoBackButton size={24} />}
            >
            </Header>
          ),
        }}
      />
      <RootStack.Screen
        name="AddExerciseModal"
        component={AddExercisePage}
        options={{
          header: () => (
            <Header
              title="Add Exercise"
              backButton={
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              }
            >
            </Header>
          ),
        }}
      />
    </>
  );
};
