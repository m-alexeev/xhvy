import ExerciseDetailsTabRoutes from "./ExerciseDetailsTab";
import { Appbar } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ExerciseCreate from "@app/pages/exercises/Create";
import Header from "@app/components/core/Header";
import ExercisesScreen from "@app/pages/exercises/Exercises";
import { ExercisedStack } from "./stacks";
import { ExerciseStackParamList } from "@app/types/navigation/exercise";

const ExerciseStackRouter = () => {
  const navigation = useNavigation<NavigationProp<ExerciseStackParamList>>();

  return (
    <ExercisedStack.Navigator>
      <ExercisedStack.Screen
        name="View"
        component={ExercisesScreen}
        options={{
          headerShown: true,
          header: () => {
            return (
              <Header title="Exercises">
                <Appbar.Action
                  icon="plus"
                  onPress={() => navigation.navigate("Create")}
                />
              </Header>
            );
          },
        }}
      />
      <ExercisedStack.Screen
        name="Details"
        component={ExerciseDetailsTabRoutes}
      />
      <ExercisedStack.Screen name="Create" component={ExerciseCreate} />
    </ExercisedStack.Navigator>
  );
};

export default ExerciseStackRouter;
